package admin

import (
	"github.com/gin-gonic/gin"
	conAdmin "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	r.GET("/", conAdmin.GetAdminAsset)
	r.GET("/:asset_id", conAdmin.GetAdminAssetById)
	r.POST("/:asset_id/appraisal", conAdmin.DoAppraisal)
}
