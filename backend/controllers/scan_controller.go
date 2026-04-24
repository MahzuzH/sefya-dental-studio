package controllers

import (
	"context"
	"dental-app/config"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type scanPatientSummary struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Institution string `json:"institution"`
}

type scanResponse struct {
	ID          string              `json:"id"`
	PatientID   string              `json:"patient_id"`
	PatientName string              `json:"patient_name"`
	Institution string              `json:"institution"`
	ScanDate    string              `json:"scan_date"`
	Status      string              `json:"status"`
	Token       string              `json:"token,omitempty"`
	Patient     *scanPatientSummary `json:"patient,omitempty"`
}

type reportDiagnosis struct {
	Tooth                   int    `json:"tooth"`
	Disease                 string `json:"disease"`
	Color                   string `json:"color"`
	TreatmentRecommendation string `json:"treatment_recommendation"`
	Symptoms                string `json:"symptoms"`
}

type reportResponse struct {
	ID          string              `json:"id"`
	PatientName string              `json:"patient_name"`
	Institution string              `json:"institution"`
	DateOfBirth string              `json:"date_of_birth"`
	Age         int                 `json:"age"`
	Gender      string              `json:"gender"`
	ScanDate    string              `json:"scan_date"`
	Status      string              `json:"status"`
	Images      map[string][]string `json:"images"`
	Diagnosis   []reportDiagnosis   `json:"diagnosis"`
}

type odontogramEntryInput struct {
	ToothNumber  int    `json:"tooth_number" binding:"required"`
	ToothSurface string `json:"tooth_surface"`
	ConditionID  string `json:"condition_id" binding:"required"`
	Notes        string `json:"notes"`
}

type createCheckupRequest struct {
	PatientID    string                 `json:"patient_id" binding:"required"`
	DentistID    string                 `json:"dentist_id" binding:"required"`
	CheckupDate  string                 `json:"checkup_date" binding:"required"`
	GeneralNotes string                 `json:"general_notes"`
	Status       string                 `json:"status"`
	Entries      []odontogramEntryInput `json:"entries"`
	Images       []imageInput           `json:"images"`
}

type updateCheckupRequest struct {
	PatientID      string                 `json:"patient_id"`
	DentistID      string                 `json:"dentist_id"`
	CheckupDate    string                 `json:"checkup_date"`
	GeneralNotes   string                 `json:"general_notes"`
	Status         string                 `json:"status"`
	Entries        []odontogramEntryInput `json:"entries"`
	ReplaceEntries bool                   `json:"replace_entries"`
	Images         []imageInput           `json:"images"`
	ReplaceImages  bool                   `json:"replace_images"`
}

type imageInput struct {
	ImageType string `json:"image_type"`
	ImagePath string `json:"image_path"`
}

func normalizeStatus(raw string) string {
	s := strings.TrimSpace(strings.ToLower(raw))
	switch s {
	case "completed":
		return "Completed"
	case "pending":
		return "Pending"
	default:
		if s == "" {
			return "Pending"
		}
		return strings.Title(s)
	}
}

func parseStatusForDB(raw string) string {
	s := strings.TrimSpace(strings.ToLower(raw))
	if s == "" {
		return "completed"
	}
	return s
}

func isValidDateYYYYMMDD(v string) bool {
	_, err := time.Parse("2006-01-02", strings.TrimSpace(v))
	return err == nil
}

func recordExists(ctx context.Context, table, id string) (bool, error) {
	var count int64
	err := config.DB.WithContext(ctx).Table(table).Where("id = ?", id).Count(&count).Error
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func validateEntryInputs(entries []odontogramEntryInput) error {
	for _, e := range entries {
		if e.ToothNumber <= 0 {
			return gin.Error{Err: ErrBadRequest("tooth_number must be > 0")}
		}
		if strings.TrimSpace(e.ConditionID) == "" {
			return gin.Error{Err: ErrBadRequest("condition_id is required")}
		}
	}
	return nil
}

func ErrBadRequest(msg string) error {
	return &badRequestError{Message: msg}
}

type badRequestError struct {
	Message string
}

func (e *badRequestError) Error() string { return e.Message }

func mapBadRequest(c *gin.Context, err error) bool {
	if err == nil {
		return false
	}
	if _, ok := err.(*badRequestError); ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return true
	}
	return false
}

func createOdontogramEntries(ctx context.Context, checkupID string, entries []odontogramEntryInput) error {
	for _, e := range entries {
		conditionID := strings.TrimSpace(e.ConditionID)
		surface := strings.TrimSpace(e.ToothSurface)
		notes := strings.TrimSpace(e.Notes)

		ok, err := recordExists(ctx, "dental_conditions", conditionID)
		if err != nil {
			return err
		}
		if !ok {
			return ErrBadRequest("condition_id not found: " + conditionID)
		}

		query := `
			INSERT INTO odontogram_entries
				(id, checkup_id, tooth_number, tooth_surface, condition_id, notes)
			VALUES
				(UUID(), ?, ?, NULLIF(?, ''), ?, NULLIF(?, ''))
		`
		if err := config.DB.WithContext(ctx).Exec(query, checkupID, e.ToothNumber, surface, conditionID, notes).Error; err != nil {
			return err
		}
	}
	return nil
}

func GetScans(c *gin.Context) {
	type scanRow struct {
		ID            string    `gorm:"column:id"`
		PatientID     string    `gorm:"column:patient_id"`
		PatientName   string    `gorm:"column:patient_name"`
		Institution   string    `gorm:"column:institution"`
		CheckupDate   time.Time `gorm:"column:checkup_date"`
		Status        string    `gorm:"column:status"`
		LatestQRToken string    `gorm:"column:latest_qr_token"`
	}

	// parse pagination and query params
	page := 1
	limit := 20
	if p := strings.TrimSpace(c.Query("page")); p != "" {
		if v, err := strconv.Atoi(p); err == nil && v > 0 {
			page = v
		}
	}
	if l := strings.TrimSpace(c.Query("limit")); l != "" {
		if v, err := strconv.Atoi(l); err == nil && v > 0 && v <= 100 {
			limit = v
		}
	}

	q := strings.TrimSpace(c.Query("q"))

	var rows []scanRow

	// base query with joins
	base := config.DB.WithContext(c.Request.Context()).
		Table("checkups c").
		Select(`
			c.id,
			c.patient_id,
			p.full_name AS patient_name,
			COALESCE(pi.name, '-') AS institution,
			c.checkup_date,
			c.status,
			COALESCE(qt.token, '') AS latest_qr_token
		`).
		Joins("JOIN patients p ON p.id = c.patient_id").
		Joins("LEFT JOIN partner_institutions pi ON pi.id = p.institution_id").
		Joins(`
			LEFT JOIN qr_tokens qt
				ON qt.id = (
					SELECT q2.id
					FROM qr_tokens q2
					WHERE q2.checkup_id = c.id
					ORDER BY q2.created_at DESC
					LIMIT 1
				)
		`)

	// apply search filter
	if q != "" {
		like := "%%%s%%"
		pattern := strings.ToLower(q)
		base = base.Where("LOWER(p.full_name) LIKE ? OR LOWER(COALESCE(pi.name, '')) LIKE ? OR LOWER(c.status) LIKE ?",
			fmt.Sprintf(like, pattern), fmt.Sprintf(like, pattern), fmt.Sprintf(like, pattern))
	}

	// count total
	var total int64
	if err := base.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count scans"})
		return
	}

	// fetch page
	offset := (page - 1) * limit
	err := base.Order("c.checkup_date DESC, c.created_at DESC").Limit(limit).Offset(offset).Scan(&rows).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch scans"})
		return
	}

	result := make([]scanResponse, 0, len(rows))
	for _, r := range rows {
		item := scanResponse{
			ID:          r.ID,
			PatientID:   r.PatientID,
			PatientName: r.PatientName,
			Institution: r.Institution,
			ScanDate:    r.CheckupDate.Format("2006-01-02"),
			Status:      normalizeStatus(r.Status),
		}

		if strings.TrimSpace(r.LatestQRToken) != "" {
			item.Token = r.LatestQRToken
		}

		item.Patient = &scanPatientSummary{
			ID:          r.PatientID,
			Name:        r.PatientName,
			Institution: r.Institution,
		}

		result = append(result, item)
	}

	c.JSON(http.StatusOK, gin.H{"items": result, "total": total})
}

func GetReport(c *gin.Context) {
	idOrToken := strings.TrimSpace(c.Param("id"))
	if idOrToken == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid report id"})
		return
	}

	type reportRow struct {
		ID          string    `gorm:"column:id"`
		PatientName string    `gorm:"column:patient_name"`
		Institution string    `gorm:"column:institution"`
		DateOfBirth string    `gorm:"column:date_of_birth"`
		Age         *int      `gorm:"column:age"`
		Gender      string    `gorm:"column:gender"`
		CheckupDate time.Time `gorm:"column:checkup_date"`
		Status      string    `gorm:"column:status"`
	}

	var row reportRow
	err := config.DB.WithContext(c.Request.Context()).
		Table("checkups c").
		Select(`
			c.id,
			p.full_name AS patient_name,
			COALESCE(pi.name, '-') AS institution,
			COALESCE(DATE_FORMAT(p.date_of_birth, '%Y-%m-%d'), '') AS date_of_birth,
			p.age,
			COALESCE(p.gender, '') AS gender,
			c.checkup_date,
			c.status,
			c.status
		`).
		Joins("JOIN patients p ON p.id = c.patient_id").
		Joins("LEFT JOIN partner_institutions pi ON pi.id = p.institution_id").
		Joins("LEFT JOIN qr_tokens qt ON qt.checkup_id = c.id AND qt.is_active = 1").
		Where("c.id = ? OR qt.token = ?", idOrToken, idOrToken).
		Order("qt.created_at DESC").
		Limit(1).
		Scan(&row).Error
	if err != nil || row.ID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Report not found"})
		return
	}

	report := reportResponse{
		ID:          row.ID,
		PatientName: row.PatientName,
		Institution: row.Institution,
		DateOfBirth: row.DateOfBirth,
		ScanDate:    row.CheckupDate.Format("2006-01-02"),
		Status:      normalizeStatus(row.Status),
		Images:      map[string][]string{},
		Diagnosis:   []reportDiagnosis{},
	}

	if row.Age != nil {
		report.Age = *row.Age
	}
	report.Gender = row.Gender

	type diagnosisRow struct {
		Tooth                   int    `gorm:"column:tooth_number"`
		Disease                 string `gorm:"column:condition_name"`
		Color                   string `gorm:"column:color_code"`
		TreatmentRecommendation string `gorm:"column:treatment_recommendation"`
		Symptoms                string `gorm:"column:symptoms"`
	}

	var diagnosisRows []diagnosisRow
	_ = config.DB.WithContext(c.Request.Context()).
		Table("odontogram_entries oe").
		Select(`
			oe.tooth_number,
			dc.name AS condition_name,
			COALESCE(dc.color_code, '#10b981') AS color_code,
			COALESCE(dc.treatment_recommendation, '') AS treatment_recommendation,
			COALESCE(dc.symptoms, '') AS symptoms
		`).
		Joins("JOIN dental_conditions dc ON dc.id = oe.condition_id").
		Where("oe.checkup_id = ?", row.ID).
		Order("oe.tooth_number ASC").
		Scan(&diagnosisRows).Error

	for _, d := range diagnosisRows {
		report.Diagnosis = append(report.Diagnosis, reportDiagnosis{
			Tooth:                   d.Tooth,
			Disease:                 d.Disease,
			Color:                   d.Color,
			TreatmentRecommendation: d.TreatmentRecommendation,
			Symptoms:                d.Symptoms,
		})
	}

	// fetch images from checkup_images + image_types
	type imageRow struct {
		Type string `gorm:"column:type_name"`
		Path string `gorm:"column:image_path"`
	}
	var imageRows []imageRow
	_ = config.DB.WithContext(c.Request.Context()).
		Table("checkup_images ci").
		Select("it.name AS type_name, ci.image_path").
		Joins("JOIN image_types it ON it.id = ci.image_type_id").
		Where("ci.checkup_id = ?", row.ID).
		Order("it.id ASC").
		Scan(&imageRows).Error

	for _, ir := range imageRows {
		report.Images[ir.Type] = append(report.Images[ir.Type], ir.Path)
	}

	if len(report.Diagnosis) == 0 {
		report.Diagnosis = []reportDiagnosis{
			{
				Tooth:                   17,
				Disease:                 "Karies Gigi",
				Color:                   "#E24B4A",
				TreatmentRecommendation: "Email: fluoride treatment atau penambalan. Dentin: penambalan gigi. Pulpa: perawatan saluran akar atau cabut gigi.",
			},
			{
				Tooth:                   21,
				Disease:                 "Karang Gigi",
				Color:                   "#888780",
				TreatmentRecommendation: "Scalling (pembersihan karang gigi) menggunakan alat ultrasonik oleh dokter gigi.",
			},
			{
				Tooth:                   46,
				Disease:                 "Restorasi Gigi",
				Color:                   "#1D9E75",
				TreatmentRecommendation: "Observasi secara berkala.",
			},
		}
	}

	c.JSON(http.StatusOK, report)
}

func GetCheckupByID(c *gin.Context) {
	id := strings.TrimSpace(c.Param("id"))
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid checkup id"})
		return
	}

	type checkupRow struct {
		ID           string    `gorm:"column:id" json:"id"`
		PatientID    string    `gorm:"column:patient_id" json:"patient_id"`
		PatientName  string    `gorm:"column:patient_name" json:"patient_name"`
		Institution  string    `gorm:"column:institution" json:"institution"`
		DentistID    string    `gorm:"column:dentist_id" json:"dentist_id"`
		DentistName  string    `gorm:"column:dentist_name" json:"dentist_name"`
		CheckupDate  time.Time `gorm:"column:checkup_date" json:"-"`
		GeneralNotes string    `gorm:"column:general_notes" json:"general_notes"`
		// images are stored in checkup_images; fetched separately
		Status    string `gorm:"column:status" json:"status"`
		CreatedAt string `gorm:"column:created_at" json:"created_at"`
	}

	type entryRow struct {
		ID            string `gorm:"column:id" json:"id"`
		ToothNumber   int    `gorm:"column:tooth_number" json:"tooth_number"`
		ToothSurface  string `gorm:"column:tooth_surface" json:"tooth_surface"`
		ConditionID   string `gorm:"column:condition_id" json:"condition_id"`
		ConditionName string `gorm:"column:condition_name" json:"condition_name"`
		ColorCode     string `gorm:"column:color_code" json:"color_code"`
		Notes         string `gorm:"column:notes" json:"notes"`
	}

	var row checkupRow
	err := config.DB.WithContext(c.Request.Context()).
		Table("checkups c").
		Select(`
			c.id,
			c.patient_id,
			p.full_name AS patient_name,
			COALESCE(pi.name, '-') AS institution,
			c.dentist_id,
			d.full_name AS dentist_name,
			c.checkup_date,
			COALESCE(c.general_notes, '') AS general_notes,
			-- images moved to checkup_images
			c.status,
			DATE_FORMAT(c.created_at, '%Y-%m-%d %H:%i:%s') AS created_at
		`).
		Joins("JOIN patients p ON p.id = c.patient_id").
		Joins("LEFT JOIN partner_institutions pi ON pi.id = p.institution_id").
		Joins("JOIN dentists d ON d.id = c.dentist_id").
		Where("c.id = ?", id).
		Limit(1).
		Scan(&row).Error
	if err != nil || row.ID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Checkup not found"})
		return
	}

	var entries []entryRow
	if err := config.DB.WithContext(c.Request.Context()).
		Table("odontogram_entries oe").
		Select(`
			oe.id,
			oe.tooth_number,
			COALESCE(oe.tooth_surface, '') AS tooth_surface,
			oe.condition_id,
			COALESCE(dc.name, '') AS condition_name,
			COALESCE(dc.color_code, '') AS color_code,
			COALESCE(oe.notes, '') AS notes
		`).
		Joins("LEFT JOIN dental_conditions dc ON dc.id = oe.condition_id").
		Where("oe.checkup_id = ?", id).
		Order("oe.tooth_number ASC, oe.created_at ASC").
		Scan(&entries).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch odontogram entries"})
		return
	}

	// fetch images for this checkup
	type imageRow struct {
		Type string `gorm:"column:type_name"`
		Path string `gorm:"column:image_path"`
	}
	var imageRows []imageRow
	_ = config.DB.WithContext(c.Request.Context()).
		Table("checkup_images ci").
		Select("it.name AS type_name, ci.image_path").
		Joins("JOIN image_types it ON it.id = ci.image_type_id").
		Where("ci.checkup_id = ?", id).
		Order("it.id ASC").
		Scan(&imageRows).Error

	images := map[string][]string{}
	for _, ir := range imageRows {
		images[ir.Type] = append(images[ir.Type], ir.Path)
	}

	c.JSON(http.StatusOK, gin.H{
		"id":            row.ID,
		"patient_id":    row.PatientID,
		"patient_name":  row.PatientName,
		"institution":   row.Institution,
		"dentist_id":    row.DentistID,
		"dentist_name":  row.DentistName,
		"checkup_date":  row.CheckupDate.Format("2006-01-02"),
		"general_notes": row.GeneralNotes,
		"images":        images,
		"status":        normalizeStatus(row.Status),
		"created_at":    row.CreatedAt,
		"entries":       entries,
	})
}

// GetImageTypes returns available image types
func GetImageTypes(c *gin.Context) {
	type trow struct {
		ID   int    `gorm:"column:id" json:"id"`
		Name string `gorm:"column:name" json:"name"`
	}
	var rows []trow
	if err := config.DB.WithContext(c.Request.Context()).Table("image_types").Select("id, name").Order("id ASC").Scan(&rows).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch image types"})
		return
	}
	c.JSON(http.StatusOK, rows)
}

func CreateCheckup(c *gin.Context) {
	var req createCheckupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	req.PatientID = strings.TrimSpace(req.PatientID)
	req.DentistID = strings.TrimSpace(req.DentistID)
	req.CheckupDate = strings.TrimSpace(req.CheckupDate)
	req.GeneralNotes = strings.TrimSpace(req.GeneralNotes)
	req.Status = parseStatusForDB(req.Status)

	if req.PatientID == "" || req.DentistID == "" || req.CheckupDate == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient_id, dentist_id, and checkup_date are required"})
		return
	}
	if !isValidDateYYYYMMDD(req.CheckupDate) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkup_date must be in YYYY-MM-DD format"})
		return
	}
	if err := validateEntryInputs(req.Entries); err != nil {
		if mapBadRequest(c, err) {
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid entries"})
		return
	}

	ok, err := recordExists(c.Request.Context(), "patients", req.PatientID)
	if err != nil {
		fmt.Printf("[Checkup] Failed patient validation: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate patient"})
		return
	}
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}

	ok, err = recordExists(c.Request.Context(), "dentists", req.DentistID)
	if err != nil {
		fmt.Printf("[Checkup] Failed dentist validation: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate dentist"})
		return
	}
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dentist not found"})
		return
	}

	tx := config.DB.WithContext(c.Request.Context()).Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	insertCheckupQuery := `
		INSERT INTO checkups
			(id, patient_id, dentist_id, checkup_date, general_notes, status)
		VALUES
			(UUID(), ?, ?, ?, NULLIF(?, ''), ?)
	`
	if err := tx.Exec(insertCheckupQuery, req.PatientID, req.DentistID, req.CheckupDate, req.GeneralNotes, req.Status).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create checkup"})
		return
	}

	var checkupID string
	if err := tx.
		Table("checkups").
		Select("id").
		Where("patient_id = ? AND dentist_id = ? AND checkup_date = ?", req.PatientID, req.DentistID, req.CheckupDate).
		Order("created_at DESC").
		Limit(1).
		Scan(&checkupID).Error; err != nil || strings.TrimSpace(checkupID) == "" {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve created checkup"})
		return
	}

	// Bulk validate and insert Odontogram Entries (Eliminates N+1 Queries)
	if len(req.Entries) > 0 {
		var conditionIDs []string
		for _, e := range req.Entries {
			if strings.TrimSpace(e.ConditionID) != "" {
				conditionIDs = append(conditionIDs, strings.TrimSpace(e.ConditionID))
			}
		}

		if len(conditionIDs) > 0 {
			var validIDs []string
			if err := tx.Table("dental_conditions").Where("id IN ?", conditionIDs).Pluck("id", &validIDs).Error; err != nil {
				tx.Rollback()
				fmt.Printf("[Checkup] Failed checking conditions: %v\n", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate dental condition"})
				return
			}
			validMap := make(map[string]bool)
			for _, v := range validIDs {
				validMap[v] = true
			}

			// Validate all first
			for _, e := range req.Entries {
				if !validMap[strings.TrimSpace(e.ConditionID)] {
					tx.Rollback()
					c.JSON(http.StatusBadRequest, gin.H{"error": "condition_id not found: " + e.ConditionID})
					return
				}
			}
		}

		// Perform bulk insert
		var valueStrings []string
		var valueArgs []interface{}
		for _, e := range req.Entries {
			valueStrings = append(valueStrings, "(UUID(), ?, ?, NULLIF(?, ''), ?, NULLIF(?, ''))")
			valueArgs = append(valueArgs, checkupID, e.ToothNumber, strings.TrimSpace(e.ToothSurface), strings.TrimSpace(e.ConditionID), strings.TrimSpace(e.Notes))
		}

		stmt := fmt.Sprintf("INSERT INTO odontogram_entries (id, checkup_id, tooth_number, tooth_surface, condition_id, notes) VALUES %s", strings.Join(valueStrings, ","))
		if err := tx.Exec(stmt, valueArgs...).Error; err != nil {
			tx.Rollback()
			fmt.Printf("[Checkup] Bulks insert error: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create odontogram entries"})
			return
		}
	}

	// insert checkup images if provided (Bulk validate and Insert)
	if len(req.Images) > 0 {
		// pre-fetch image types mapping
		var imageTypes []struct {
			ID   int
			Name string
		}
		if err := tx.Table("image_types").Select("id, name").Scan(&imageTypes).Error; err != nil {
			tx.Rollback()
			fmt.Printf("[Checkup] Failed fetching image types: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load image types"})
			return
		}

		typeMap := make(map[string]int)
		for _, t := range imageTypes {
			typeMap[t.Name] = t.ID
		}

		var valueStrings []string
		var valueArgs []interface{}
		for _, img := range req.Images {
			imgType := strings.TrimSpace(img.ImageType)
			imgPath := strings.TrimSpace(img.ImagePath)
			if imgType == "" || imgPath == "" {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid image entry"})
				return
			}
			typeID, ok := typeMap[imgType]
			if !ok {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid image type: " + imgType})
				return
			}
			valueStrings = append(valueStrings, "(UUID(), ?, ?, ?)")
			valueArgs = append(valueArgs, checkupID, typeID, imgPath)
		}

		stmt := fmt.Sprintf("INSERT INTO checkup_images (id, checkup_id, image_type_id, image_path) VALUES %s", strings.Join(valueStrings, ","))
		if err := tx.Exec(stmt, valueArgs...).Error; err != nil {
			tx.Rollback()
			fmt.Printf("[Checkup] Bulks images insert error: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert checkup images"})
			return
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    "Checkup created",
		"checkup_id": checkupID,
	})
}

func UpdateCheckup(c *gin.Context) {
	id := strings.TrimSpace(c.Param("id"))
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid checkup id"})
		return
	}

	var req updateCheckupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	req.PatientID = strings.TrimSpace(req.PatientID)
	req.DentistID = strings.TrimSpace(req.DentistID)
	req.CheckupDate = strings.TrimSpace(req.CheckupDate)
	req.GeneralNotes = strings.TrimSpace(req.GeneralNotes)
	if strings.TrimSpace(req.Status) != "" {
		req.Status = parseStatusForDB(req.Status)
	}
	if err := validateEntryInputs(req.Entries); err != nil {
		if mapBadRequest(c, err) {
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid entries"})
		return
	}

	exists, err := recordExists(c.Request.Context(), "checkups", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check checkup"})
		return
	}
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Checkup not found"})
		return
	}

	if req.PatientID != "" {
		ok, err := recordExists(c.Request.Context(), "patients", req.PatientID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate patient"})
			return
		}
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
			return
		}
	}

	if req.DentistID != "" {
		ok, err := recordExists(c.Request.Context(), "dentists", req.DentistID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate dentist"})
			return
		}
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Dentist not found"})
			return
		}
	}

	if req.CheckupDate != "" && !isValidDateYYYYMMDD(req.CheckupDate) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkup_date must be in YYYY-MM-DD format"})
		return
	}

	updates := map[string]any{}
	if req.PatientID != "" {
		updates["patient_id"] = req.PatientID
	}
	if req.DentistID != "" {
		updates["dentist_id"] = req.DentistID
	}
	if req.CheckupDate != "" {
		updates["checkup_date"] = req.CheckupDate
	}
	if req.GeneralNotes != "" {
		updates["general_notes"] = req.GeneralNotes
	}
	if req.Status != "" {
		updates["status"] = req.Status
	}

	tx := config.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	if len(updates) > 0 {
		if err := tx.Table("checkups").Where("id = ?", id).Updates(updates).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update checkup"})
			return
		}
	}

	if req.ReplaceEntries {
		if err := tx.Table("odontogram_entries").Where("checkup_id = ?", id).Delete(nil).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to replace odontogram entries"})
			return
		}
		for _, e := range req.Entries {
			conditionID := strings.TrimSpace(e.ConditionID)
			surface := strings.TrimSpace(e.ToothSurface)
			notes := strings.TrimSpace(e.Notes)

			ok, err := recordExists(c.Request.Context(), "dental_conditions", conditionID)
			if err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate dental condition"})
				return
			}
			if !ok {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"error": "condition_id not found: " + conditionID})
				return
			}

			insertEntryQuery := `
				INSERT INTO odontogram_entries
					(id, checkup_id, tooth_number, tooth_surface, condition_id, notes)
				VALUES
					(UUID(), ?, ?, NULLIF(?, ''), ?, NULLIF(?, ''))
			`
			if err := tx.Exec(insertEntryQuery, id, e.ToothNumber, surface, conditionID, notes).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create odontogram entries"})
				return
			}
		}
	}

	// handle images replacement if requested
	if req.ReplaceImages {
		if err := tx.Table("checkup_images").Where("checkup_id = ?", id).Delete(nil).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to replace checkup images"})
			return
		}
		for _, img := range req.Images {
			imgType := strings.TrimSpace(img.ImageType)
			imgPath := strings.TrimSpace(img.ImagePath)
			if imgType == "" || imgPath == "" {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid image entry"})
				return
			}
			var typeID int
			if err := tx.Table("image_types").Select("id").Where("name = ?", imgType).Limit(1).Scan(&typeID).Error; err != nil || typeID == 0 {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid image type: " + imgType})
				return
			}
			insertImgQuery := `
				INSERT INTO checkup_images
					(id, checkup_id, image_type_id, image_path)
				VALUES
					(UUID(), ?, ?, ?)
			`
			if err := tx.Exec(insertImgQuery, id, typeID, imgPath).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert checkup images"})
				return
			}
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Checkup updated",
		"checkup_id": id,
	})
}
