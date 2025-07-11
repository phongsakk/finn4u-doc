package admin

import (
	"fmt"
	"math"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	request "github.com/phongsakk/finn4u-back/app/request/admin"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm"
)

func FindAsset(c *gin.Context) {
	var page = 1
	var take = 20
	var offset = utils.Offset(page, take)
	var response []models.Asset
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

	// Count all assets before applying pagination
	var totalAssets int64
	if err := db.Model(&models.Asset{}).Count(&totalAssets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	// Fetch assets with pagination
	// .Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Preload("AssetTag").Preload("AssetTag.Tag").Preload("AssetAppraisal").Preload("AssetAuction")
	if err := db.Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetAppraisal").Offset(offset).Limit(take).Order("id DESC").Find(&response).Error; err != nil {
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

func SearchAsset(c *gin.Context) {
	id, e := strconv.Atoi(c.Param("asset_id"))
	if e != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("Invalid asset ID"),
		})
		return
	}
	var asset models.Asset
	var user models.Admin

	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusUnauthorized,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	if err := c.ShouldBindUri(&id); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	fmt.Println("ID:", id)

	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)

	if err = db.Preload("Province").Preload("AssetType").Preload("Owner").Preload("AssetImages").Preload("AssetTag").Preload("AssetTag.Tag").Preload("AssetAppraisal").Preload("AssetAuction").Model(&asset).Where("id = ?", id).First(&asset).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:  http.StatusNotFound,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(200, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Asset retrieved successfully"),
		Data:    asset,
	})
}

func DoAppraisal(c *gin.Context) {
	var asset models.Asset
	var user models.Admin
	var r request.DoAppraisal

	id, e := strconv.Atoi(c.Param("asset_id"))
	if e != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("Invalid asset ID"),
		})
		return
	}
	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusUnauthorized,
			Error: utils.NullableString("Invalid token"),
		})
		return
	}
	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
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
	if err = db.Where("id =?", id).First(&asset).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:  http.StatusNotFound,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	if err := r.Validated(); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	if err := db.Transaction(func(tx *gorm.DB) error {
		var apprisal models.AssetAppraisal
		apprisal.AssetID = asset.ID
		tx.Where("asset_id =?", asset.ID).First(&apprisal)
		apprisal.PriceAppraisal = r.PriceAppraisal
		apprisal.CollateraPrice = r.CollateraPrice
		apprisal.Duration = r.Duration

		if err := tx.Save(&apprisal).Error; err != nil {
			return err
		}

		fmt.Println("new images", r.NewImages)
		if r.NewImages != nil {
			fmt.Println("not null")
			newImages := *r.NewImages
			for _, image := range newImages {
				fmt.Println("image url", image)
				var imageModel models.AssetImage
				imageModel.AssetID = apprisal.AssetID
				imageModel.Image = image

				if ErrCreate := tx.Create(&imageModel).Error; ErrCreate != nil {
					return ErrCreate
				}
			}
		}

		if r.DisplayImages != nil {
			// update asset_image set is_display=0 where asset_id=?
			if err := db.Exec("UPDATE asset_images SET is_display=FALSE WHERE asset_id=?", asset.ID).Error; err != nil {
				return err
			}

			// update asset_image set is_display=1 where id IN?
			displayImages := r.DisplayImages
			ids := utils.JoinIntSlice(displayImages, ",")
			query := fmt.Sprintf("UPDATE asset_images SET is_display=TRUE WHERE id IN (%s)", ids)
			if err := db.Exec(query).Error; err != nil {
				return err
			}
		}

		tags := *r.Tags
		for _, tagId := range tags {
			var tag models.AssetTag
			tx.Where("asset_id=? AND tag_id=?", asset.ID, tagId).First(&tag)
			tag.AssetID = asset.ID
			tag.TagID = tagId
			if err := tx.Save(&tag).Error; err != nil {
				return err
			}
		}

		if r.Auction != nil {
			_auction := r.Auction
			var auction models.AssetAuction
			if err := db.Where("asset_id=?", asset.ID).First(&auction).Error; err == gorm.ErrRecordNotFound {
				auction.AssetID = asset.ID
				auction.FromDate = _auction.FromDate
				auction.ToDate = _auction.ToDate
				auction.FromTime = _auction.FromTime
				auction.ToTime = _auction.ToTime
				auction.MaxTax = _auction.MaxTax

				if err := tx.Create(&auction).Error; err != nil {
					return err
				}
			} else {
				auction.AssetID = asset.ID
				auction.FromDate = _auction.FromDate
				auction.ToDate = _auction.ToDate
				auction.FromTime = _auction.FromTime
				auction.ToTime = _auction.ToTime
				auction.MaxTax = _auction.MaxTax

				if err := tx.Save(&auction).Error; err != nil {
					return err
				}
			}
		}

		if r.IsPublished != nil {
			asset.IsPublished = *r.IsPublished
		}

		if r.Status != nil {
			asset.Status = *r.Status
		}

		if err := tx.Save(&asset).Error; err != nil {
			return err
		}

		fmt.Println("complete")
		return nil
	}); err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString("Failed to update asset"),
		})
		return
	}

	c.JSON(200, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Asset updated successfully"),
	})
}

func SetAssetAsRecommended(c *gin.Context) {
	var sellID = c.Param("asset_id")
	var sell models.Asset

	db, dbErr := database.Conn()
	if dbErr != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString(dbErr.Error()),
			Error:   utils.NullableString(dbErr.Error()),
		})
		return
	}
	defer database.Close(db)

	if err := db.Where("id=?", sellID).First(&sell).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Status:  false,
			Message: utils.NullableString(err.Error()),
		})
		return
	}

	now := time.Now()
	sell.RecommendedAt = &now
	if err := db.Save(&sell).Error; err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Set as recommended"),
		Data:    sell,
	})
}

func RemoveAssetFromRecommended(c *gin.Context) {
	var sellID = c.Param("asset_id")
	var sell models.Asset

	db, dbErr := database.Conn()
	if dbErr != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString(dbErr.Error()),
			Error:   utils.NullableString(dbErr.Error()),
		})
		return
	}
	defer database.Close(db)

	if err := db.Where("id=?", sellID).First(&sell).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Status:  false,
			Message: utils.NullableString(err.Error()),
		})
		return
	}

	sell.RecommendedAt = nil
	if err := db.Save(&sell).Error; err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Set as recommended"),
		Data:    sell,
	})
}
