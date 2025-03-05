package route

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller"
	conAdmin "github.com/phongsakk/finn4u-back/app/controller/admin"
	mid "github.com/phongsakk/finn4u-back/app/middleware"
)

func V1(r *gin.RouterGroup) {
	r.GET("/", con.HealthCheck)

	auth := r.Group("/auth")
	{
		auth.POST("/login", con.Login)
		auth.POST("/signin", con.Login)
		auth.POST("/checkin", con.Login)
		auth.POST("/connect", con.Connect) // เข้าใช้งาน admin

		auth.POST("/refresh-token", con.RefreshToken)
		auth.POST("/verify-token", con.VerifyToken)

		auth.POST("/register", con.Register) // ลงทะเบียนผู้ใช้งานทั่วไป
		auth.POST("/signup", con.Signup)     // ลงทะเบียนผู้ขายฝาก/ฝากขาย
		auth.POST("/enroll", con.Enroll)     // ลงทะเบียนผู้ลงทุน

		auth.POST("/forgot-password", con.ForgotPassword)
		auth.POST("/reset-password", con.ResetPassword)
	}

	asset := r.Group("/asset")
	{
		asset.Use(mid.AuthMiddleware)
		asset.GET("/", con.GetAsset)
		asset.POST("/", con.CreateAsset)
	}

	master := r.Group("/master")
	{
		master.GET("/province", con.GetMasterProvince)
		master.GET("/district", con.GetMasterDistrict)
		master.GET("/sub-district", con.GetMasterSubDistrict)
		master.GET("/asset-type", con.GetMasterAssetType)
	}

	admin := r.Group("/admin")
	{
		asset := admin.Group("/asset")
		{
			asset.GET("/", conAdmin.GetAdminAsset)
		}
		// admin.GET("/asset", con.GetAdminAsset)
		// admin.GET("/asset/:id", con.GetAdminAssetByID)
		// admin.PUT("/asset/:id", con.UpdateAdminAsset)
		// admin.DELETE("/asset/:id", con.DeleteAdminAsset)

		// admin.GET("/user", con.GetAdminUser)
		// admin.GET("/user/:id", con.GetAdminUserByID)
		// admin.PUT("/user/:id", con.UpdateAdminUser)
		// admin.DELETE("/user/:id", con.DeleteAdminUser)

		// admin.GET("/transaction", con.GetAdminTransaction)
		// admin.GET("/transaction/:id", con.GetAdminTransactionByID)
		// admin.PUT("/transaction/:id", con.UpdateAdminTransaction)
		// admin.DELETE("/transaction/:id", con.DeleteAdminTransaction)
	}
}
