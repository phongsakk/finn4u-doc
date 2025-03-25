package route

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller"
	mid "github.com/phongsakk/finn4u-back/app/middleware"
	"github.com/phongsakk/finn4u-back/route/admin"
	"github.com/phongsakk/finn4u-back/route/consignor"
	"github.com/phongsakk/finn4u-back/route/general"
)

func V1(r *gin.RouterGroup) {

	r.Use(mid.Cors)
	r.GET("/", con.HealthCheck)

	authRouter := r.Group("/auth")
	AuthRouterGroup(authRouter)

	asset := r.Group("/asset")
	AssetRouterGroup(asset)

	masterRouter := r.Group("/master")
	MasterRouterGroup(masterRouter)

	adminRouter := r.Group("/admin")
	admin.RouterGroup(adminRouter)

	consignorRouter := r.Group("/consignor")
	consignor.RouterGroup(consignorRouter)

	generalRouter := r.Group("/general")
	general.RouterGroup(generalRouter)
}
