package route

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller"
	mid "github.com/phongsakk/finn4u-back/app/middleware"
)

func AssetRouterGroup(r *gin.RouterGroup) {
	r.Use(mid.AuthMiddleware)
	r.GET("/", con.GetAsset)
	r.POST("/", con.CreateAsset)
}
