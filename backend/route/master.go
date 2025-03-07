package route

import (
	"github.com/gin-gonic/gin"
	con "github.com/phongsakk/finn4u-back/app/controller"
)

func MasterRouterGroup(r *gin.RouterGroup) {
	r.GET("/province", con.GetMasterProvince)
	r.GET("/district", con.GetMasterDistrict)
	r.GET("/sub-district", con.GetMasterSubDistrict)
	r.GET("/asset-type", con.GetMasterAssetType)
}
