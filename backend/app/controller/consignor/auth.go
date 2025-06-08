package consignor

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func Profile(c *gin.Context) {
	var user models.Consignor

	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Error:   utils.NullableString(err.Error()),
			Message: utils.NullableString("Invalid token"),
		})
		return
	}
	db, errDb := database.Conn()
	if errDb != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(errDb.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Model(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusUnauthorized,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:   http.StatusOK,
		Status: true,
		Data:   user,
	})
}
