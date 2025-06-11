package investor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
)

func BidRouterGroup(r *gin.RouterGroup) {
	r.GET("/:asset_id", controller.FindBid) // [F]ind
	r.POST("", controller.CreateBid)        // [C]reate
	r.GET("", controller.SearchBid)         // [S]earch
	// r.POST("/:bid_id", controller.CreateBid) // [U]pdate
	// r.DELETE("", controller.CreateBid)       // [K]ill
}
