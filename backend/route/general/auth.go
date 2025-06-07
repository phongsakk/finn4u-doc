package general

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/general"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	guest := r.Use(middleware.AuthMiddleware(libs.AUTH_GUEST))
	auth := r.Use(middleware.AuthMiddleware(libs.AUTH_STRICT))
	guest.POST("/login", controller.Login)
	auth.POST("/refresh-token", controller.RefreshToken)
	guest.POST("/register", controller.Register)
	guest.POST("/resend-otp", controller.ResendOTP)
	guest.POST("/verify-otp", controller.VerifyOTP)
	auth.GET("/profile", controller.Profile)
}
