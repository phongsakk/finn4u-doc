package admin

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm/clause"
)

func Overview(c *gin.Context) {
	var Matched int64
	var Remains int64
	var Registered int64

	DB, ErrDB := database.Conn()
	if ErrDB != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString("Database connection error"),
		})
		return
	}
	defer database.Close(DB)

	if Err := DB.Model(&models.Asset{}).Where("status=?", libs.ASSET_MATCHING).Count(&Matched).Error; Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString("Failed to count matched assets"),
		})
		return
	}

	if Err := DB.Model(&models.Asset{}).Where("status=?", libs.ASSET_APRAISALED).Count(&Remains).Error; Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString("Failed to count matched assets"),
		})
		return
	}

	var Tmp int64 = 0
	if Err := DB.Model(&models.User{}).Count(&Tmp).Error; Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString("Failed to count registered users"),
		})
		return
	}
	Registered = Tmp + Registered
	if Err := DB.Model(&models.Consignor{}).Count(&Tmp).Error; Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString("Failed to count registered users"),
		})
		return
	}
	Registered = Tmp + Registered

	var PlaceMostInterested []types.PlaceMostInterested
	var Anies []map[string]any
	if Err := DB.Model(&models.Asset{}).Joins("Province").Joins("District").Joins("AssetAppraisal").Select(
		"\"Province\".name AS province",
		"\"District\".name AS district",
		"consignment_price AS price",
		"collateral AS Collateral",
	).Offset(0).Take(5).Order(clause.OrderByColumn{
		Column: clause.Column{
			Name: "view_count",
		},
		Desc: true,
	}).Find(&Anies).Error; Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}
	fmt.Println(Anies)

	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Overview"),
		Data: map[string]any{
			"matched":               Matched,
			"remains":               Remains,
			"registered":            Registered,
			"place_most_interested": PlaceMostInterested,
			"user_with_most_investment": []any{
				map[string]any{
					"name":       "",
					"investment": 0,
				},
				map[string]any{
					"name":       "",
					"investment": 0,
				},
				map[string]any{
					"name":       "",
					"investment": 0,
				},
			},
		},
	})
}
