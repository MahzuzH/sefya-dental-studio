package controllers

import (
	"dental-app/config"
	"dental-app/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type loginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type dentistAuth struct {
	ID           string `gorm:"column:id"`
	Email        string `gorm:"column:email"`
	PasswordHash string `gorm:"column:password_hash"`
	IsActive     bool   `gorm:"column:is_active"`
}

func Login(c *gin.Context) {
	var input loginRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var dentist dentistAuth
	err := config.DB.
		Table("dentists").
		Select("id, email, password_hash, is_active").
		Where("email = ?", input.Email).
		First(&dentist).Error
	if err != nil || dentist.ID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	if !dentist.IsActive {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User is inactive"})
		return
	}

	if !utils.CheckPassword(dentist.PasswordHash, input.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong password"})
		return
	}

	token, err := utils.GenerateToken(dentist.ID, "dentist")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

func GetProfile(c *gin.Context) {
	rawUserID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userID, ok := rawUserID.(string)
	if !ok || strings.TrimSpace(userID) == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user id"})
		return
	}

	type dentistProfile struct {
		ID       string `gorm:"column:id" json:"id"`
		FullName string `gorm:"column:full_name" json:"full_name"`
		Email    string `gorm:"column:email" json:"email"`
	}

	var d dentistProfile
	err := config.DB.Table("dentists").Select("id, full_name, email").Where("id = ?", userID).First(&d).Error
	if err != nil || d.ID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "Dentist not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":        d.ID,
		"full_name": d.FullName,
		"email":     d.Email,
	})
}
