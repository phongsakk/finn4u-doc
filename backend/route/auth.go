package route

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	r.POST("/signin", con.SignIn)          // consignor
	r.POST("/consignor/login", con.SignIn) // consignor
	r.POST("/refresh-token", con.RefreshToken)

	r.POST("/verify-token", con.VerifyToken)

	r.POST("/signup", con.Signup)                          // ลงทะเบียนผู้ขายฝาก/ฝากขาย
	r.POST("/consignor/register", con.Signup)              // ลงทะเบียนผู้ขายฝาก/ฝากขาย
	r.POST("/consignor/resendOTP", con.ConsignorResendOTP) // ลงทะเบียนผู้ขายฝาก/ฝากขาย
	r.POST("/consignor/verifyOTP", con.ConsignorVerifyOTP) // ลงทะเบียนผู้ขายฝาก/ฝากขาย

	r.POST("/investor/register", con.InvestorRegister)   // ลงทะเบียนนักลงทุน
	r.POST("/investor/resendOTP", con.InvestorResendOTP) // ลงทะเบียนนักลงทุน
	r.POST("/investor/verifyOTP", con.InvestorVerifyOtp) // ลงทะเบียนนักลงทุน

	r.POST("/enroll", con.Enroll) // ลงทะเบียนผู้ลงทุน

	r.POST("/forgot-password", con.ForgotPassword)
	r.POST("/reset-password", con.ResetPassword)
}
