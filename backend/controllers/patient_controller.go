package controllers

import (
	"context"
	"dental-app/config"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type createPatientRequest struct {
	InstitutionID string `json:"institution_id" binding:"required"`
	FullName      string `json:"full_name" binding:"required"`
	StudentID     string `json:"student_id"`
	DateOfBirth   string `json:"date_of_birth"`
	Age           *int   `json:"age"`
	Gender        string `json:"gender"`
	Address       string `json:"address"`
	Phone         string `json:"phone"`
}

type updatePatientRequest struct {
	InstitutionID string `json:"institution_id"`
	FullName      string `json:"full_name"`
	StudentID     string `json:"student_id"`
	DateOfBirth   string `json:"date_of_birth"`
	Age           *int   `json:"age"`
	Gender        string `json:"gender"`
	Address       string `json:"address"`
	Phone         string `json:"phone"`
}

type patientListItem struct {
	ID              string `json:"id"`
	InstitutionID   string `json:"institution_id"`
	InstitutionName string `json:"institution_name"`
	FullName        string `json:"full_name"`
	StudentID       string `json:"student_id"`
	DateOfBirth     string `json:"date_of_birth"`
	Age             *int   `json:"age"`
	Gender          string `json:"gender"`
	Address         string `json:"address"`
	Phone           string `json:"phone"`
	CreatedAt       string `json:"created_at"`
}

type patientDetailResponse struct {
	ID              string `json:"id"`
	InstitutionID   string `json:"institution_id"`
	InstitutionName string `json:"institution_name"`
	FullName        string `json:"full_name"`
	StudentID       string `json:"student_id"`
	DateOfBirth     string `json:"date_of_birth"`
	Age             *int   `json:"age"`
	Gender          string `json:"gender"`
	Address         string `json:"address"`
	Phone           string `json:"phone"`
	CreatedAt       string `json:"created_at"`
}

type patientCreateResponse struct {
	ID            string `json:"id"`
	InstitutionID string `json:"institution_id"`
	FullName      string `json:"full_name"`
	StudentID     string `json:"student_id"`
	DateOfBirth   string `json:"date_of_birth"`
	Age           *int   `json:"age"`
	Gender        string `json:"gender"`
	Address       string `json:"address"`
	Phone         string `json:"phone"`
	CreatedAt     string `json:"created_at"`
}

type institutionListItem struct {
	ID           string `json:"id"`
	ClinicID     string `json:"clinic_id"`
	Name         string `json:"name"`
	Type         string `json:"type"`
	Address      string `json:"address"`
	ContactEmail string `json:"contact_email"`
	CreatedAt    string `json:"created_at"`
}

func institutionExists(ctx context.Context, institutionID string) (bool, error) {
	var count int64
	err := config.DB.WithContext(ctx).
		Table("partner_institutions").
		Where("id = ?", institutionID).
		Count(&count).Error
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func CreatePatient(c *gin.Context) {
	var req createPatientRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	req.InstitutionID = strings.TrimSpace(req.InstitutionID)
	req.FullName = strings.TrimSpace(req.FullName)
	req.StudentID = strings.TrimSpace(req.StudentID)
	req.Gender = strings.TrimSpace(req.Gender)
	req.Address = strings.TrimSpace(req.Address)
	req.Phone = strings.TrimSpace(req.Phone)
	req.DateOfBirth = strings.TrimSpace(req.DateOfBirth)

	if req.InstitutionID == "" || req.FullName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "institution_id and full_name are required"})
		return
	}

	exists, err := institutionExists(c.Request.Context(), req.InstitutionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate institution"})
		return
	}
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institution not found"})
		return
	}

	insertQuery := `
		INSERT INTO patients
			(id, institution_id, full_name, student_id, date_of_birth, age, gender, address, phone)
		VALUES
			(UUID(), ?, ?, NULLIF(?, ''), NULLIF(?, ''), ?, NULLIF(?, ''), NULLIF(?, ''), NULLIF(?, ''))
	`
	if err := config.DB.WithContext(c.Request.Context()).Exec(
		insertQuery,
		req.InstitutionID,
		req.FullName,
		req.StudentID,
		req.DateOfBirth,
		req.Age,
		req.Gender,
		req.Address,
		req.Phone,
	).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create patient"})
		return
	}

	var created patientCreateResponse
	if err := config.DB.WithContext(c.Request.Context()).
		Table("patients").
		Select(`
			id,
			institution_id,
			full_name,
			COALESCE(student_id, '') AS student_id,
			COALESCE(DATE_FORMAT(date_of_birth, '%Y-%m-%d'), '') AS date_of_birth,
			age,
			COALESCE(gender, '') AS gender,
			COALESCE(address, '') AS address,
			COALESCE(phone, '') AS phone,
			DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
		`).
		Where("institution_id = ? AND full_name = ?", req.InstitutionID, req.FullName).
		Order("created_at DESC").
		Limit(1).
		Scan(&created).Error; err != nil {
		c.JSON(http.StatusCreated, gin.H{"message": "Patient created"})
		return
	}

	c.JSON(http.StatusCreated, created)
}

func GetPatients(c *gin.Context) {
	var patients []patientListItem
	query := config.DB.WithContext(c.Request.Context()).
		Table("patients p").
		Select(`
			p.id,
			p.institution_id,
			pi.name AS institution_name,
			p.full_name,
			COALESCE(p.student_id, '') AS student_id,
			COALESCE(DATE_FORMAT(p.date_of_birth, '%Y-%m-%d'), '') AS date_of_birth,
			p.age,
			COALESCE(p.gender, '') AS gender,
			COALESCE(p.address, '') AS address,
			COALESCE(p.phone, '') AS phone,
			DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') AS created_at
		`).
		Joins("LEFT JOIN partner_institutions pi ON pi.id = p.institution_id")

	if q := strings.TrimSpace(c.Query("q")); q != "" {
		like := "%" + q + "%"
		query = query.Where(
			"p.full_name LIKE ? OR p.student_id LIKE ? OR pi.name LIKE ?",
			like, like, like,
		)
	}

	if institutionID := strings.TrimSpace(c.Query("institution_id")); institutionID != "" {
		query = query.Where("p.institution_id = ?", institutionID)
	}

	// Pagination params
	page := 1
	limit := 20
	if p := strings.TrimSpace(c.Query("page")); p != "" {
		if v, err := strconv.Atoi(p); err == nil && v > 0 {
			page = v
		}
	}
	if l := strings.TrimSpace(c.Query("limit")); l != "" {
		if v, err := strconv.Atoi(l); err == nil && v > 0 {
			limit = v
		}
	}

	var total int64
	countQuery := query
	if err := countQuery.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count patients"})
		return
	}

	offset := (page - 1) * limit
	if err := query.Order("p.created_at DESC").Limit(limit).Offset(offset).Scan(&patients).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch patients"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": patients, "total": total})
}

func GetPatientByID(c *gin.Context) {
	id := strings.TrimSpace(c.Param("id"))
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid patient id"})
		return
	}

	var patient patientDetailResponse
	err := config.DB.WithContext(c.Request.Context()).
		Table("patients p").
		Select(`
			p.id,
			p.institution_id,
			pi.name AS institution_name,
			p.full_name,
			COALESCE(p.student_id, '') AS student_id,
			COALESCE(DATE_FORMAT(p.date_of_birth, '%Y-%m-%d'), '') AS date_of_birth,
			p.age,
			COALESCE(p.gender, '') AS gender,
			COALESCE(p.address, '') AS address,
			COALESCE(p.phone, '') AS phone,
			DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') AS created_at
		`).
		Joins("LEFT JOIN partner_institutions pi ON pi.id = p.institution_id").
		Where("p.id = ?", id).
		Limit(1).
		Scan(&patient).Error
	if err != nil || patient.ID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		return
	}

	c.JSON(http.StatusOK, patient)
}

func UpdatePatient(c *gin.Context) {
	id := strings.TrimSpace(c.Param("id"))
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid patient id"})
		return
	}

	var req updatePatientRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	req.InstitutionID = strings.TrimSpace(req.InstitutionID)
	req.FullName = strings.TrimSpace(req.FullName)
	req.StudentID = strings.TrimSpace(req.StudentID)
	req.DateOfBirth = strings.TrimSpace(req.DateOfBirth)
	req.Gender = strings.TrimSpace(req.Gender)
	req.Address = strings.TrimSpace(req.Address)
	req.Phone = strings.TrimSpace(req.Phone)

	var existingCount int64
	if err := config.DB.WithContext(c.Request.Context()).Table("patients").Where("id = ?", id).Count(&existingCount).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check patient"})
		return
	}
	if existingCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		return
	}

	if req.InstitutionID != "" {
		exists, err := institutionExists(c.Request.Context(), req.InstitutionID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate institution"})
			return
		}
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Institution not found"})
			return
		}
	}

	updates := map[string]any{}

	if req.InstitutionID != "" {
		updates["institution_id"] = req.InstitutionID
	}
	if req.FullName != "" {
		updates["full_name"] = req.FullName
	}
	if req.StudentID != "" {
		updates["student_id"] = req.StudentID
	}
	if req.DateOfBirth != "" {
		updates["date_of_birth"] = req.DateOfBirth
	}
	if req.Age != nil {
		updates["age"] = req.Age
	}
	if req.Gender != "" {
		updates["gender"] = req.Gender
	}
	if req.Address != "" {
		updates["address"] = req.Address
	}
	if req.Phone != "" {
		updates["phone"] = req.Phone
	}

	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
		return
	}

	if err := config.DB.WithContext(c.Request.Context()).Table("patients").Where("id = ?", id).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update patient"})
		return
	}

	GetPatientByID(c)
}

func GetInstitutions(c *gin.Context) {
	var institutions []institutionListItem

	query := config.DB.WithContext(c.Request.Context()).
		Table("partner_institutions").
		Select(`
			id,
			clinic_id,
			name,
			COALESCE(type, '') AS type,
			COALESCE(address, '') AS address,
			COALESCE(contact_email, '') AS contact_email,
			DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
		`)

	if q := strings.TrimSpace(c.Query("q")); q != "" {
		like := "%" + q + "%"
		query = query.Where("name LIKE ? OR type LIKE ? OR contact_email LIKE ?", like, like, like)
	}

	if err := query.Order("name ASC").Scan(&institutions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch institutions"})
		return
	}

	c.JSON(http.StatusOK, institutions)
}
