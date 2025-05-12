package consignor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
)

func InvestmentRouterGroup(r *gin.RouterGroup) {
	r.GET("/:asset_id", controller.FindInvestment) // [F]ind
	r.POST("", controller.CreateInvestment)        // [C]reate
	r.GET("", controller.SearchInvestment)         // [S]earch
	// r.POST("/:bid_id", controller.CreateBid) // [U]pdate
	// r.DELETE("", controller.CreateBid)       // [K]ill
}
