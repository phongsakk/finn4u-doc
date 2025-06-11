package investor

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func MatchingById(c *gin.Context) {
	//
	matchingId := c.Param("id")
	c.JSON(200, types.Response{
		Code:    200,
		Message: utils.NullableString("Matching"),
		Data:    matchingId,
	})
}
