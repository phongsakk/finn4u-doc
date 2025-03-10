package admin

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller/admin"
)

func TagRouterGroup(r *gin.RouterGroup) {
	r.GET("/", con.FindTag)
	r.POST("/", con.CreateTag)
	r.GET("/:tag_id", con.SearchTag)
	r.PUT("/:tag_id", con.UpdateTag)
	r.DELETE("/:tag_id", con.KillTag)
}
