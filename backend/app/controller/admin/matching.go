package admin

import (
	"fmt"
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm/clause"
)

func FindMatching(c *gin.Context) {
	page, errPage := strconv.Atoi(c.DefaultQuery("page", "1"))
	if errPage != nil {
		page = 1
	}

	limit, errTake := strconv.Atoi(c.DefaultQuery("limit", "20"))
	if errTake != nil {
		limit = 20
	}
	var offset = utils.Offset(page, limit)
	orderBy := c.DefaultQuery("orderBy", "created_at")
	sort := c.DefaultQuery("sort", "desc")
	idDesc := strings.ToLower(sort) != "asc"

	fmt.Println(page, limit, orderBy, sort)

	var response []models.AssetAuction
	var user models.Admin
	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusUnauthorized,
			Error: utils.NullableString(err.Error()),
		})
		return
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
	models := db.Model(&models.AssetAuction{})
	preloaded := models.Preload("Asset").Preload("Asset.Owner").Preload("Asset.Province").Preload("Asset.AssetType").Preload("Asset.AssetAppraisal")
	preloaded = preloaded.Offset(offset).Limit(limit).Order(clause.OrderByColumn{
		Column: clause.Column{
			Name: orderBy,
		},
		Desc: idDesc,
	})
	if err := models.Count(&totalAssets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	// Fetch assets with pagination
	if err := preloaded.Offset(offset).Limit(limit).Order(clause.OrderByColumn{
		Column: clause.Column{
			Name: orderBy,
		},
		Desc: idDesc,
	}).Find(&response).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	total := len(response)
	totalPage := int64(math.Ceil(float64(totalAssets) / float64(len(response))))
	c.JSON(200, types.Response{
		Status:    true,
		Code:      http.StatusOK,
		Message:   utils.NullableString("Assets retrieved successfully"),
		Data:      response,
		Page:      &page,
		Limit:     &limit,
		Total:     &total,
		TotalPage: &totalPage,
	})
}

func UpdateMatching(c *gin.Context) {
	//
}

func CreateMatching(c *gin.Context) {
	//
}

func KillMatching(c *gin.Context) {
	//
}

func SearchMatchingByAssetID(c *gin.Context) {
	assetID, errorAssetID := strconv.Atoi(c.Param("asset_id"))
	if errorAssetID != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Message: utils.NullableString("invalid asset_id"),
		})
		return
	}

	var response models.AssetAuction
	var user models.Admin
	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusUnauthorized,
			Error: utils.NullableString(err.Error()),
		})
		return
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

	models := db.Model(&models.AssetAuction{})
	preloaded := models.Preload("Asset").Preload("Asset.Owner")
	preloaded = preloaded.Preload("Asset.Province").Preload("Asset.AssetType")
	preloaded = preloaded.Preload("Asset.AssetBidOffer").Preload("Asset.AssetAppraisal")
	preloaded = preloaded.Where("asset_id=?", assetID)
	// Fetch assets with pagination
	if err := preloaded.First(&response).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(200, types.Response{
		Status:  true,
		Code:    http.StatusOK,
		Message: utils.NullableString("Assets retrieved successfully"),
		Data:    response,
	})
}
