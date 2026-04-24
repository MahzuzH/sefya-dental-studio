package models

import "time"

type Scan struct {
	ID        int       `json:"id"`
	PatientID int       `json:"patient_id"`
	Patient   Patient   `gorm:"foreignKey:PatientID" json:"patient"` // ✅ INI FIX
	ScanDate  time.Time `json:"scan_date"`
	Status    string    `json:"status"`
}
