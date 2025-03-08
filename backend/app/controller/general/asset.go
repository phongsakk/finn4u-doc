package general

import (
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func FindAsset(c *gin.Context) {
	var page = 1
	var take = 20
	var offset = utils.Offset(page, take)
	var response []models.Asset

	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)

	var totalAssets int64
	if err := db.Model(&models.Asset{}).Count(&totalAssets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	// Fetch assets with pagination
	if err := db.Model(&models.Asset{}).Where("status > 0").Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Offset(offset).Limit(take).Order("id DESC").Find(&response).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	total := len(response)
	totalPage := int64(math.Ceil(float64(totalAssets) / float64(len(response))))
	c.JSON(200, types.Response{
		Code:      http.StatusOK,
		Message:   utils.NullableString("Assets retrieved successfully"),
		Data:      response,
		Page:      &page,
		Limit:     &take,
		Total:     &total,
		TotalPage: &totalPage,
	})

}
