package main

import (
	"dental-app/config"
	"dental-app/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config.ConnectDB()
	routes.SetupRoutes(r)

	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "API running",
		})
	})

	r.Run(":8080")
}
