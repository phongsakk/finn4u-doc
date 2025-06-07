package general

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/general"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	r.POST("/login", controller.Login)
	r.POST("/refresh-token", controller.RefreshToken)
	r.POST("/register", controller.Register)
	r.POST("/resend-otp", controller.ResendOTP)
	r.POST("/verify-otp", controller.VerifyOTP)
}
