package admin

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	r.GET("/refresh-token", controller.RefreshToken)
	r.GET("/profile", controller.Profile)
}
