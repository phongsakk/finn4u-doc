package controller

import (
	"fmt"
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/app/request"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm"
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
