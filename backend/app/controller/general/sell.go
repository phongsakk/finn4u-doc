package general

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	request "github.com/phongsakk/finn4u-back/app/request/general"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm"
)

// FUCKS - [F]ind [U]pdate [C]reate [K]ill [S]earch

func FindSell(c *gin.Context) {
	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Find sell"),
	})
}

func UpdateSell(c *gin.Context) {
	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Update sell"),
	})
}

func CreateSell(c *gin.Context) {
	var request request.CreateSellRequest
	var user models.User
	var response models.Sell

	if Err := user.GetFromRequest(c); Err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	if Err := c.ShouldBindJSON(&request); Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	if Err := request.Validated(); Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	DB, ErrDB := database.Conn()
	if ErrDB != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString(ErrDB.Error()),
		})
		return
	}
	defer database.Close(DB)

	if Err := DB.Transaction(func(tx *gorm.DB) error {
		response.SellTypeID = request.SellTypeID
		response.AssetTypeID = request.AssetTypeID
		response.Title = request.Title
		response.Address = request.Address
		response.Street = request.Street
		response.Soi = request.Soi
		response.SubDistrictID = request.SubDistrictID
		response.DistrictID = request.DistrictID
		response.PostalCode = request.PostalCode
		response.GoogleMapLocation = request.GoogleMapLocation
		response.BedroomCount = request.BedroomCount
		response.BathroomCount = request.BathroomCount
		response.FloorLevel = request.FloorLevel
		response.SquareMeter = request.SquareMeter
		response.Price = request.Price
		response.OwnerID = user.ID

		return tx.Create(&response).Error
	}); Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Create sell"),
		Data:    response,
	})
}

func KillSell(c *gin.Context) {
	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Kill sell"),
	})
}

func SearchSell(c *gin.Context) {
	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Search sell"),
	})
}
