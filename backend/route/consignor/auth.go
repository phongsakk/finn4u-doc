package consignor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
)

func AuthRouterGroup(r *gin.RouterGroup) {
	r.GET("/profile", controller.Profile)
}
