package admin

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func OverviewRouterGroup(r *gin.RouterGroup) {
	r.GET("", controller.Overview)
}
