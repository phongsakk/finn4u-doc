package consignor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	var authMode = middleware.ConsignorAuthMiddleware
	guest := r.Group("")
	guest.Use(authMode(libs.AUTH_GUEST))
	strict := r.Group("")
	strict.Use(authMode(libs.AUTH_STRICT))

	guest.GET("/recommended", controller.GetRecommendedAsset)
	guest.GET("/public", controller.GetPublicAsset)
	guest.GET("/public/:id", controller.SearchAsset)
	strict.GET("", controller.GetAsset)
	strict.POST("", controller.CreateAsset)
}
