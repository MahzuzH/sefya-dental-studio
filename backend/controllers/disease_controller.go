package controllers

import (
	"dental-app/config"
	"net/http"

	"github.com/gin-gonic/gin"
)

type dentalConditionResponse struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Treatment   string `json:"treatment"`
	ColorCode   string `json:"color_code"`
}

func GetDiseases(c *gin.Context) {
	var conditions []dentalConditionResponse

	err := config.DB.
		Table("dental_conditions").
		Select(`
			id,
			name,
			COALESCE(symptoms, '') AS description,
			COALESCE(treatment_recommendation, '') AS treatment,
			COALESCE(color_code, '') AS color_code
		`).
		Order("name ASC").
		Scan(&conditions).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch diseases",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": conditions,
	})
}
