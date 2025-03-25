package general

import (
	"fmt"
	"math"
	"net/http"
	"strconv"

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
	var isAuthorize = true
	var user models.User

	if err := user.GetFromRequest(c); err != nil {
		isAuthorize = false
	}

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

	if isAuthorize {
		fmt.Println("is auth")
		if err := db.Model(&models.Asset{}).Where("status > ?", 0).Count(&totalAssets).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
		if err := db.Model(&models.Asset{}).Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Where("status > ?", 0).Offset(offset).Limit(take).Order("id DESC").Find(&response).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
	} else {
		if err := db.Model(&models.Asset{}).Where("status > ?", 0).Where("is_published=?", true).Count(&totalAssets).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
		if err := db.Model(&models.Asset{}).Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Where("status > ?", 0).Where("is_published=?", true).Offset(offset).Limit(take).Order("id DESC").Find(&response).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
	}

	fmt.Println(totalAssets)
	total := len(response)
	var totalPage int64 = 0
	if total > 0 {
		totalPage = int64(math.Ceil(float64(totalAssets) / float64(len(response))))
	}
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

func SearchAsset(c *gin.Context) {
	var assetIdStr = c.Param("id")
	var user models.User
	var isAuthorize = true
	var response models.Asset
	assetId, err := strconv.Atoi(assetIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("Invalid asset ID"),
		})
		return
	}

	if err := user.GetFromRequest(c); err != nil {
		isAuthorize = false
	}

	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Model(models.Asset{}).Where("id=?", assetId).Preload("Province").Preload("District").Preload("AssetType").Preload("Owner").Preload("AssetImages").Find(&response).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	if response.ID == uint(assetId) && response.Status > 0 && response.IsPublished {
		c.JSON(200, types.Response{
			Code:    http.StatusOK,
			Message: utils.NullableString("Asset found successfully"),
			Data:    response,
			Status:  true,
			// Authorize: &isAuthorize,
		})
		return
	} else {
		if err := db.Model(models.Asset{}).Where("id=?", assetId).Find(&response).Error; err != nil {
			c.JSON(http.StatusNotFound, types.Response{
				Code:  http.StatusNotFound,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
	}

	if isAuthorize || response.IsPublished {
		c.JSON(http.StatusOK, types.Response{
			Message: utils.NullableString("Asset retrieved successfully"),
			Status:  true,
			Code:    http.StatusOK,
			Data:    response,
		})
		return
	}

	c.JSON(http.StatusNotAcceptable, types.Response{
		Message: utils.NullableString("Permission denied"),
		Status:  false,
		Code:    http.StatusNotAcceptable,
	})
}
