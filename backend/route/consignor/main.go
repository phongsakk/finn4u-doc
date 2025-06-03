package consignor

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func RouterGroup(r *gin.RouterGroup) {
	var authMode = middleware.ConsignorAuthMiddleware
	custom := r.Group("")
	guest := r.Group("")
	guest.Use(authMode(libs.AUTH_GUEST))
	strict := r.Group("")
	strict.Use(authMode(libs.AUTH_STRICT))

	asset := custom.Group("/asset")
	AssetRouterGroup(asset)

	bid := strict.Group("/bid")
	BidRouterGroup(bid)

	Investment := strict.Group("/Investment")
	InvestmentRouterGroup(Investment)

	matching := strict.Group("/matching")
	MatchingRouterGroup(matching)
}
