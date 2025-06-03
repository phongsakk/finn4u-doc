package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func GetMasterProvince(c *gin.Context) {
	var model []models.Province
	db, err := database.Conn()
	if err != nil {
		c.JSON(500, types.Response{
			Code:  500,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)

	db.Find(&model)
	c.JSON(200, types.Response{
		Code:    200,
		Status:  true,
		Data:    model,
		Message: utils.NullableString("Get master province success"),
	})
}

func GetMasterDistrict(c *gin.Context) {
	var model []models.District
	db, err := database.Conn()
	if err != nil {
		c.JSON(500, types.Response{
			Code:  500,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)

	db.Preload("Province").Find(&model)
	c.JSON(200, types.Response{
		Code:    200,
		Status:  true,
		Data:    model,
		Message: utils.NullableString("Get master district success"),
	})
}

func GetMasterSubDistrict(ctx *gin.Context) {
	var model []models.SubDistrict
	db, err := database.Conn()
	if err != nil {
		ctx.JSON(500, types.Response{
			Code:  500,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	db.Preload("District").Find(&model)
	ctx.JSON(200, types.Response{
		Code:    200,
		Status:  true,
		Data:    model,
		Message: utils.NullableString("Get master sub_district success"),
	})
}

func GetMasterAssetType(ctx *gin.Context) {
	var model []models.AssetType
	db, err := database.Conn()
	if err != nil {
		ctx.JSON(500, types.Response{
			Code:  500,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	db.Find(&model)
	ctx.JSON(200, types.Response{
		Code:    200,
		Status:  true,
		Data:    model,
		Message: utils.NullableString("Get master asset type success"),
	})
}

func GetMasterSellType(ctx *gin.Context) {
	var model []models.SellType
	db, err := database.Conn()
	if err != nil {
		ctx.JSON(500, types.Response{
			Code:  500,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	db.Find(&model)
	ctx.JSON(200, types.Response{
		Code:    200,
		Status:  true,
		Data:    model,
		Message: utils.NullableString("Get master asset type success"),
	})
}

func GetUserPrefix(c *gin.Context) {
	var model []models.UserPrefix
	db, err := database.Conn()
	if err != nil {
		c.JSON(500, types.Response{
			Code:  500,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	db.Find(&model)
	c.JSON(200, types.Response{
		Code:    200,
		Status:  true,
		Data:    model,
		Message: utils.NullableString("Get master prefix success"),
	})
}
