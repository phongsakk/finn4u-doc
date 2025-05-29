package general

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/controller/general"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func SellRouterGroup(r *gin.RouterGroup) {
	auth := r.Use(middleware.AuthMiddleware(libs.AUTH_GUEST))

	auth.POST("", general.CreateSell)
	auth.GET("", general.SearchSell)
	auth.POST("/publish", general.PublishSell)
	auth.POST("/private", general.PrivateSell)
	auth.GET("/:id", general.FindSell)
	auth.POST("/:id", general.UpdateSell)
	auth.GET("/my", general.MySell)

}
