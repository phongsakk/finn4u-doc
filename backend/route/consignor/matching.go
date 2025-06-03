package consignor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
)

func MatchingRouterGroup(r *gin.RouterGroup) {
	r.GET("/:asset_id", controller.GetMatchingEvidence)
	r.POST("/:asset_id", controller.UploadMatchingEvidence)
}
