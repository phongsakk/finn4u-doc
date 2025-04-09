package route

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	r.POST("/login", con.Login)
	r.POST("/signin", con.SignIn)
	r.POST("/checkin", con.Login)
	// r.POST("/connect", con.Connect) // เข้าใช้งาน admin

	r.POST("/refresh-token", con.RefreshToken)
	r.POST("/verify-token", con.VerifyToken)

	r.POST("/register", con.Register)                      // ลงทะเบียนผู้ใช้งานทั่วไป
	r.POST("/signup", con.Signup)                          // ลงทะเบียนผู้ขายฝาก/ฝากขาย
	r.POST("/consignor/resendOTP", con.ConsignorResendOTP) // ลงทะเบียนผู้ขายฝาก/ฝากขาย
	r.POST("/consignor/verifyOTP", con.ConsignorVerifyOTP) // ลงทะเบียนผู้ขายฝาก/ฝากขาย

	r.POST("/enroll", con.Enroll) // ลงทะเบียนผู้ลงทุน

	r.POST("/forgot-password", con.ForgotPassword)
	r.POST("/reset-password", con.ResetPassword)
}
