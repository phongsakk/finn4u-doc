package general

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func SellRouterGroup(r *gin.RouterGroup) {
	auth := r.Use(middleware.AuthMiddleware(libs.AUTH_GUEST))

	auth.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello from sell router group"})
	})

}
