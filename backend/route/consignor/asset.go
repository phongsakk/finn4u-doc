package consignor

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/controller"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	r.GET("/recommended", controller.GetRecommendedAsset)
	r.GET("/public", controller.GetPublicAsset)
	r.GET("", controller.GetAsset)
	r.POST("", controller.CreateAsset)
}
