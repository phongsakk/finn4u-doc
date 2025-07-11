package admin

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func SellRouterGroup(r *gin.RouterGroup) {
	r.GET("", controller.SearchSell)
	r.POST("/block", controller.UpdateSell)
	r.POST("/:sell_id/set-as-recommended", controller.SetSellAsRecommended)
	r.POST("/:sell_id/remove-from-recommended", controller.RemoveSellFromRecommended)
}
