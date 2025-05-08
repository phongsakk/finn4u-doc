package general

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/controller/general"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	var authMode = middleware.AuthMiddleware
	// r.GET("/:id", authMode(libs.AUTH_GUEST), general.SearchAsset)
	guest := r.Use(authMode(libs.AUTH_GUEST))
	guest.GET("/:id", general.SearchAsset)
	guest.GET("", general.FindAsset)
}
