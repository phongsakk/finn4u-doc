package route

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller"
	"github.com/phongsakk/finn4u-back/app/libs"
	mid "github.com/phongsakk/finn4u-back/app/middleware"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	r.Use(mid.AuthMiddleware(libs.AUTH_STRICT))
	r.GET("/:id", con.Asset)
	r.GET("", con.GetAsset)
	r.GET("/", con.GetAsset)
	r.POST("/", con.CreateAsset)
}
