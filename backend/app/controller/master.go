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
