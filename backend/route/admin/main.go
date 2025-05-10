package admin

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/controller"
	mid "github.com/phongsakk/finn4u-back/app/middleware"
)

func RouterGroup(r *gin.RouterGroup) {
	guest := r.Group("/")
	guest.Use()
	guest.POST("/login", controller.Connect)

	auth := r.Group("/")
	auth.Use(mid.AdminAuthMiddleware)

	asset := auth.Group("/asset")
	AssetRouterGroup(asset)

	matching := auth.Group("/matching")
	MatchingRouterGroup(matching)

	tag := auth.Group("/tag")
	TagRouterGroup(tag)
}
