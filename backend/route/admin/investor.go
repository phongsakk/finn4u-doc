package admin

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func InvestorRouterGroup(r *gin.RouterGroup) {
	r.GET("", controller.FindInvestors)
	// r.PUT("/:id", controller.UpdateInvestor)
	// r.POST("", controller.CreateInvestor)
	// r.DELETE("/:id", controller.KillInvestor)
	r.GET("/:id", controller.SearchInvestor)
}
