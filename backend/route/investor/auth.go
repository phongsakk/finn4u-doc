package investor

import (
	"github.com/gin-gonic/gin"
	constroller "github.com/phongsakk/finn4u-back/app/controller/investor"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	r.POST("/register", constroller.Register)   // ลงทะเบียนนักลงทุน
	r.POST("/resendOTP", constroller.ResendOTP) // ลงทะเบียนนักลงทุน
	r.POST("/verifyOTP", constroller.VerifyOtp) // ลงทะเบียนนักลงทุน
	r.POST("/login", constroller.Register)      // ลงทะเบียนนักลงทุน
}
