package investor

import (
	"github.com/gin-gonic/gin"
	controller "github.com/phongsakk/finn4u-back/app/controller/investor"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/app/middleware"
)

func MatchingRouterGroup(r *gin.RouterGroup) {
	auth := r.Group("")
	{
		auth.Use(middleware.ConsignorAuthMiddleware(libs.AUTH_STRICT))
		auth.GET("/:id", controller.MatchingById)
	}
}
