package consignor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
)

func BidRouterGroup(r *gin.RouterGroup) {
	r.POST("", controller.CreateBid)
}
