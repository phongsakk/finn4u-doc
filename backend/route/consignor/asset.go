package consignor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	r.GET("", controller.GetAsset)
	r.POST("", controller.CreateAsset)
	// r.GET("", controller.GetAsset)
}
