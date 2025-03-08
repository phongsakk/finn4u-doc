package general

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/controller/general"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	r.GET("/", general.FindAsset)
}
