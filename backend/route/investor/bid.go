package investor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/consignor"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func BidRouterGroup(r *gin.RouterGroup) {
	guest := r.Group("")
	guest.Use(middleware.ConsignorAuthMiddleware(libs.AUTH_GUEST))
	auth := r.Group("")
	auth.Use(middleware.ConsignorAuthMiddleware(libs.AUTH_STRICT))

	auth.GET("/:asset_id", controller.FindBid) // [F]ind
	auth.POST("", controller.CreateBid)        // [C]reate
	auth.GET("", controller.SearchBid)         // [S]earch
	// r.POST("/:bid_id", controller.CreateBid) // [U]pdate
	// r.DELETE("", controller.CreateBid)       // [K]ill
}
