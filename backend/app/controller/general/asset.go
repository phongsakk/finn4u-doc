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
	var response []models.Asset
	var user models.User
	isAuthorize := true
	qpage := c.DefaultQuery("page", "1")
	page, epage := strconv.Atoi(qpage)
	qtake := c.DefaultQuery("take", "20")
	take, etake := strconv.Atoi(qtake)
	qAssetTypeID := c.DefaultQuery("asset_type_id", "0")
	assetTypeID, eAssetTypeID := strconv.Atoi(qAssetTypeID)
	keyword := c.DefaultQuery("keyword", "")
	offset := utils.Offset(page, take)

	if epage != nil {
		page = 1
	}
	if etake != nil {
		take = 20
	}
	if eAssetTypeID != nil {
		assetTypeID = 0
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

	var totalAssets int64

	if isAuthorize {
		fmt.Println("is auth")
		var query = db.Model(&models.Asset{}).Where("status > ?", 0)
		if keyword != "" {
			query = query.Where("name LIKE ?", "%"+keyword+"%")
		}
		if assetTypeID != 0 {
			query = query.Where("asset_type_id", assetTypeID)
		}
		if err := query.Count(&totalAssets).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
		var preload = query.Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages")
		if err := preload.Offset(offset).Limit(take).Order("id DESC").Find(&response).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
	} else {
		var query = db.Model(&models.Asset{}).Where("status > ?", 0).Where("is_published=?", true)
		if keyword != "" {
			query = query.Where("name LIKE ?", "%"+keyword+"%")
		}
		if assetTypeID != 0 {
			query = query.Where("asset_type_id", assetTypeID)
		}
		if err := query.Count(&totalAssets).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}
		var preload = query.Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages")
		if err := preload.Offset(offset).Limit(take).Order("id DESC").Find(&response).Error; err != nil {
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
		Status:    true,
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
	if err := db.Model(models.Asset{}).Where("id=?", assetId).Preload("AssetAuction").Preload("Province").Preload("District").Preload("AssetType").Preload("AssetTag").Preload("AssetTag.Tag").Preload("Owner").Preload("AssetImages").Find(&response).Error; err != nil {
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
