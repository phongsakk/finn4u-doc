package admin

import (
	"github.com/gin-gonic/gin"
	conAdmin "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func MatchingRouterGroup(r *gin.RouterGroup) {
	r.GET("", conAdmin.FindMatching)
	// r.POST("/:matching_id", conAdmin.UpdateMatching)
	r.POST("", conAdmin.CreateMatching)
	// r.DELETE("/:matching_id", conAdmin.KillMatching)
	r.GET("/:asset_id", conAdmin.SearchMatchingByAssetID)
}
