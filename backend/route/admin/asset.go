package admin

import (
	"github.com/gin-gonic/gin"
	conAdmin "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	r.GET("/", conAdmin.FindAsset)
	r.GET("/:asset_id", conAdmin.SearchAsset)
	r.POST("/:asset_id/appraisal", conAdmin.DoAppraisal)

	r.POST("/matchings", conAdmin.DoAppraisal)
}
