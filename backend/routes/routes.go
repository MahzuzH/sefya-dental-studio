package routes

import (
	"dental-app/controllers"
	"dental-app/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Serve uploaded images
	r.Static("/uploads", "./uploads")

	api := r.Group("/api")
	{
		api.POST("/login", controllers.Login)

		// public
		api.GET("/diseases", controllers.GetDiseases)
		api.GET("/image-types", controllers.GetImageTypes)
		api.GET("/report/:id", controllers.GetReport)

		// protected
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			// current user
			protected.GET("/me", controllers.GetProfile)
			// institutions
			protected.GET("/institutions", controllers.GetInstitutions)

			// patients
			protected.POST("/patients", controllers.CreatePatient)
			protected.GET("/patients", controllers.GetPatients)
			protected.GET("/patients/:id", controllers.GetPatientByID)
			protected.PUT("/patients/:id", controllers.UpdatePatient)

			// checkups / scans
			protected.GET("/scans", controllers.GetScans)
			protected.GET("/checkups/:id", controllers.GetCheckupByID)
			protected.POST("/checkups", controllers.CreateCheckup)
			protected.PUT("/checkups/:id", controllers.UpdateCheckup)

			// uploads
			protected.POST("/upload", controllers.UploadImage)
		}
	}
}
