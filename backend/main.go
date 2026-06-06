package main

import (
	"dental-app/config"
	"dental-app/controllers"
	"dental-app/routes"
	"dental-app/storage"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func requireEnv(key string) {
	if os.Getenv(key) == "" {
		panic(fmt.Sprintf("Required environment variable %s is not set", key))
	}
}

func main() {
	requireEnv("JWT_SECRET")
	requireEnv("DB_PASS")

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
