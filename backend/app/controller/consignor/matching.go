package consignor

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func GetMatchingEvidence(c *gin.Context) {
	assetID, errorAssetID := strconv.Atoi(c.Param("asset_id"))
	if errorAssetID != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Message: utils.NullableString("Invalid asset ID"),
			Error:   utils.NullableString(errorAssetID.Error()),
		})
		return
	}

	var user models.Consignor
	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Message: utils.NullableString(err.Error()),
			Error:   utils.NullableString(err.Error()),
		})
		return
	}

	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Message: utils.NullableString("Database connection error"),
			Error:   utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)

	var asset models.Asset
	models := db.Model(&models.AssetAuction{})
	preloaded := models.Preload("Asset").Preload("Asset.Owner").Preload("Asset.Province").Preload("Asset.AssetType")
	preloaded = preloaded.Preload("Asset.AssetAppraisal").Preload("AssetBidOffer", "bidder_id=? AND is_winner=?", user.ID, true)
	filtered := preloaded.Where("asset_id=?", assetID).Where("bidder_id=?", user.ID)
	if err := filtered.First(&asset).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Message: utils.NullableString("Asset not found"),
			Error:   utils.NullableString(err.Error()),
		})
		return
	}

}

func UploadMatchingEvidence(c *gin.Context) {
	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusTeapot,
		Message: utils.NullableString("Not implemented yet"),
	})
}
