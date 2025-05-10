package consignor

import (
	"fmt"
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/app/request"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func GetAsset(c *gin.Context) {
	var page = 0
	var take = 20
	var offset = utils.Offset(page, take)
	var response []models.Asset
	var user models.Consignor
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

	// Count all assets before applying pagination
	var totalAssets int64
	if err := db.Model(&models.Asset{}).Where("owner_id = ?", user.ID).Count(&totalAssets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	// Fetch assets with pagination
	if err := db.Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Where("owner_id = ?", user.ID).Offset(offset).Limit(take).Order("id").Find(&response).Error; err != nil {
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
		Limit:     &take,
		Total:     &total,
		TotalPage: &totalPage,
	})
}

func CreateAsset(c *gin.Context) {
	var request request.CreateAssetRequest
	var user models.Consignor
	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	if err := c.ShouldBindBodyWithJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	if err := request.Validated(); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	fmt.Println(user)
	fmt.Println(user.Email, user.ID)

	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	var asset models.Asset = models.Asset{
		ProvinceID:          request.ProvinceID,
		DistrictID:          request.DistrictID,
		AssetTypeID:         request.AssetTypeID,
		AriaSizeRai:         request.AriaSizeRai,
		AriaSizeNgan:        request.AriaSizeNgan,
		AriaSizeSquareWa:    request.AriaSizeSquareWa,
		AriaSizeSquareMetre: request.AriaSizeSquareMetre,
		Collateral:          request.Collateral,
		ConsignmentPrice:    request.ConsignmentPrice,
		LandTitleDeedNumber: request.LandTitleDeedNumber,
		LandTitleDeedImage:  request.LandTitleDeedImage,
		LandPlotNumber:      request.LandPlotNumber,
		Description:         request.Description,
		Location:            request.LocationX,
		LocationX:           request.LocationX,
		LocationY:           request.LocationY,
		IsMultipleHolder:    request.IsMultipleHolder,
		EndedAt:             request.EndedAt,
		OwnerID:             user.ID,
	}

	if err := db.Where("id =?", request.ProvinceID).First(&models.Province{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("Province not found"),
		})
		return
	}

	if err := db.Where("id =?", request.DistrictID).First(&models.District{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("District not found"),
		})
		return
	}

	if err := db.Where("id =?", request.AssetTypeID).First(&models.AssetType{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("Asset type not found"),
		})
		return
	}

	if err := db.Transaction(func(t *gorm.DB) error {
		asset.GenID = fmt.Sprintf("%s%d", "ASSET", time.Now().UnixNano())
		if err := t.Create(&asset).Error; err != nil {
			fmt.Println("error assigning asset")
			return err
		}

		if len(request.AssetImages) > 0 {
			for idx, v := range request.AssetImages {
				var image = models.AssetImage{
					AssetID: asset.ID,
					Image:   v,
				}
				if err := t.Create(&image).Error; err != nil {
					fmt.Printf("error assigning asset image %d\n", idx)
					return err
				}
			}
		}

		return nil
	}); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(201, types.Response{
		Status:  true,
		Code:    http.StatusCreated,
		Message: utils.NullableString("Asset created successfully"),
		Data:    asset,
	})
}

func GetRecommendedAsset(c *gin.Context) {
	page, errPage := strconv.Atoi(c.DefaultQuery("page", "1"))
	if errPage != nil {
		page = 1
	}

	take, errTake := strconv.Atoi(c.DefaultQuery("take", "20"))
	if errTake != nil {
		take = 20
	}
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

	// Count all assets before applying pagination
	var totalAssets int64
	if err := db.Model(&models.Asset{}).Where("status = ? AND is_recommended = ?", 2, true).Count(&totalAssets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	// Fetch assets with pagination
	if err := db.Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Where("status = 2 AND is_recommended = ?", true).Offset(offset).Limit(take).Order("id desc").Find(&response).Error; err != nil {
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
		Status:    true,
		Message:   utils.NullableString("Assets retrieved successfully"),
		Data:      response,
		Page:      &page,
		Limit:     &take,
		Total:     &total,
		TotalPage: &totalPage,
	})
}

func GetPublicAsset(c *gin.Context) {
	fmt.Println("GetPublicAsset")
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
	assetTypeId, errAssetTypeId := strconv.Atoi(c.DefaultQuery("asset_type_id", "0"))
	if errAssetTypeId != nil {
		assetTypeId = 0
	}

	// asset_type_id

	fmt.Println(page, limit, orderBy, sort)

	var response []models.Asset
	var user models.Consignor
	var isLogin = true
	if err := user.GetFromRequest(c); err != nil {
		isLogin = false
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

	if isLogin {
		// Count all assets before applying pagination
		var totalAssets int64
		models := db.Model(&models.Asset{}).Where("status = ?", 2)
		if assetTypeId != 0 {
			models = models.Where("asset_type_id=?", assetTypeId)
		}
		preloaded := models.Preload("Province").Preload("AssetType")
		preloaded = preloaded.Preload("Owner").Preload("AssetImages")
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
	} else {
		// Count all assets before applying pagination
		var totalAssets int64
		if err := db.Model(&models.Asset{}).Where("status = ? AND is_published = ?", 2, true).Count(&totalAssets).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return
		}

		// Fetch assets with pagination
		if err := db.Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Where("status = ? AND is_published = ?", 2, true).Offset(offset).Limit(limit).Order(clause.OrderByColumn{
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
			Code:      http.StatusOK,
			Status:    true,
			Message:   utils.NullableString("Assets retrieved successfully"),
			Data:      response,
			Page:      &page,
			Limit:     &limit,
			Total:     &total,
			TotalPage: &totalPage,
		})
	}
}

func SearchAsset(c *gin.Context) {
	var assetIdStr = c.Param("id")
	var user models.Consignor
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
	if err := db.Model(models.Asset{}).Where("id=?", assetId).Preload("AssetAuction").Preload("Province").Preload("District").Preload("AssetType").Preload("AssetTag").Preload("AssetTag.Tag").Preload("Owner").Preload("AssetImages").Preload("AssetAppraisal").Find(&response).Error; err != nil {
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
