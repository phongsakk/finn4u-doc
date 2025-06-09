package admin

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/admin"
	mid "github.com/phongsakk/finn4u-back/app/middleware"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	guest := r.Group("")
	guest.Use()

	auth := r.Group("")
	auth.Use(mid.AdminAuthMiddleware)

	guest.GET("/login", controller.Login)
	guest.POST("/refresh-token", controller.RefreshToken)
	auth.GET("/profile", controller.Profile)
}
