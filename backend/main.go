package main

import (
	"dental-app/config"
	"dental-app/controllers"
	"dental-app/routes"
	"dental-app/storage"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config.ConnectDB()
	controllers.ImageStorage = storage.NewLocalStorage("uploads")
	routes.SetupRoutes(r)

	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "API running",
		})
	})

	r.Run(":8080")
}
