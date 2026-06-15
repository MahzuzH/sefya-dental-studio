package main

import (
	"bufio"
	"dental-app/config"
	"dental-app/controllers"
	"dental-app/routes"
	"dental-app/storage"
	"fmt"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func loadEnv() {
	if os.Getenv("JWT_SECRET") != "" {
		return
	}
	f, err := os.Open(".env")
	if err != nil {
		return
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 || parts[0] == "" {
			continue
		}
		key := strings.TrimSpace(parts[0])
		val := strings.TrimSpace(parts[1])
		if os.Getenv(key) == "" {
			os.Setenv(key, val)
		}
	}
}

func requireEnv(key string) {
	if os.Getenv(key) == "" {
		panic(fmt.Sprintf("Required environment variable %s is not set", key))
	}
}

func main() {
	loadEnv()
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
