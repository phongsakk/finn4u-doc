package consignor

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func RouterGroup(r *gin.RouterGroup) {
	r.Use(middleware.ConsignorAuthMiddleware)

	asset := r.Group("/asset")
	AssetRouterGroup(asset)

}
