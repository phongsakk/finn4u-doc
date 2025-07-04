package general

import (
	"fmt"
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	request "github.com/phongsakk/finn4u-back/app/request/general"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// FUCKS - [F]ind [U]pdate [C]reate [K]ill [S]earch

func FindSell(c *gin.Context) {
	SellID := c.Param("id")
	var response models.Sell

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

	Model := DB.Model(&models.Sell{})
	Preloaded := Model.Preload("Province").Preload("District").Preload("Images").Preload("Owner").Preload("SellType").Preload("AssetType")
	Where := Preloaded.Where("id=?", SellID)

	if Err := Where.First(&response).Error; Err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Status:  false,
			Message: utils.NullableString("Sell not found"),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Find sell"),
		Data:    &response,
	})
}

func UpdateSell(c *gin.Context) {
	var request request.UpdateSellRequest
	var user models.User
	var response models.Sell
	SellID := c.Param("id")

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
		if Err := tx.Where("id=?", SellID).First(&response).Error; Err != nil {
			return Err
		}
		response.SellTypeID = request.SellTypeID
		response.AssetTypeID = request.AssetTypeID
		response.Title = request.Title
		response.Address = request.Address
		response.Description = request.Description
		response.ProjectName = request.ProjectName
		response.Street = request.Street
		response.Soi = request.Soi
		response.SubDistrictID = request.SubDistrictID
		response.DistrictID = request.DistrictID
		response.ProvinceID = request.ProvinceID
		response.PostalCode = request.PostalCode
		response.GoogleMapLocation = request.GoogleMapLocation
		response.BedroomCount = request.BedroomCount
		response.BathroomCount = request.BathroomCount
		response.FloorLevel = request.FloorLevel
		response.SquareMeter = request.SquareMeter
		response.Price = request.Price
		response.OwnerID = user.ID
		response.AgencyRequired = request.AgencyRequired

		if Err := tx.Save(&response).Error; Err != nil {
			return Err
		}

		if request.Images != nil {
			Add := request.Images.Add
			Delete := request.Images.Delete
			Change := request.Images.Change

			if Add != nil {
				fmt.Println("Add Images")
				for _, image := range *Add {
					var Image models.SellImage
					Image.SellID = response.ID
					Image.Image = image
					if Err := DB.Create(&Image).Error; Err != nil {
						return Err
					}
				}
			}

			if Delete != nil {
				fmt.Println("Delete Images")
				for _, imageID := range *Delete {
					var Image models.SellImage
					Image.ID = imageID
					Image.SellID = response.ID
					DB.Delete(&Image)
				}
			}

			if Change != nil {
				fmt.Println("Update Images ")
				for _, change := range *Change {
					var Image models.SellImage
					if Err := DB.Where("id=? AND sell_id=?", change.ID, response.ID).First(&Image).Error; Err != nil {
						return fmt.Errorf("there is no image ID %d in sell ID %d", change.ID, response.ID)
					}

					Image.Image = change.Image
					if Err := DB.Save(&Image).Error; Err != nil {
						return Err
					}
				}
			}
		}

		return nil
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
		Message: utils.NullableString("Update sell"),
		Data:    response,
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
		response.Description = request.Description
		response.ProjectName = request.ProjectName
		response.Street = request.Street
		response.Soi = request.Soi
		response.SubDistrictID = request.SubDistrictID
		response.DistrictID = request.DistrictID
		response.ProvinceID = request.ProvinceID
		response.PostalCode = request.PostalCode
		response.GoogleMapLocation = request.GoogleMapLocation
		response.BedroomCount = request.BedroomCount
		response.BathroomCount = request.BathroomCount
		response.FloorLevel = request.FloorLevel
		response.SquareMeter = request.SquareMeter
		response.Price = request.Price
		response.OwnerID = user.ID
		response.AgencyRequired = request.AgencyRequired

		if Err := tx.Create(&response).Error; Err != nil {
			return Err
		}

		// loop through images and create them
		for _, image := range request.Images {
			imageResponse := models.SellImage{}
			imageResponse.Image = image
			imageResponse.SellID = response.ID
			if Err := tx.Create(&imageResponse).Error; Err != nil {
				return Err
			}
		}

		return nil
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
	var response []models.Sell

	DB, ErrDB := database.Conn()
	if ErrDB != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Status:  false,
			Message: utils.NullableString(ErrDB.Error()),
		})
		return
	}
	defer database.Close(DB)

	QueryLimit := c.DefaultQuery("limit", "10")
	QueryPage := c.DefaultQuery("page", "1")
	OrderBy := c.DefaultQuery("order_by", "created_at")
	Sort := c.DefaultQuery("sort", "desc")
	SellTypeID := c.DefaultQuery("sell_type_id", "0")
	IsDesc := strings.ToLower(Sort) != "asc"
	Limit, ErrLimit := strconv.Atoi(QueryLimit)
	Page, ErrPage := strconv.Atoi(QueryPage)
	if ErrLimit != nil {
		Limit = 10
	}
	if ErrPage != nil {
		Page = 1
	}
	Offset := utils.Offset(Page, Limit)

	Model := DB.Model(&models.Sell{})
	Where := Model.Where("is_disabled=? AND is_published=?", false, true)
	if SellTypeID != "0" {
		Where = Where.Where("sell_type_id=?", SellTypeID)
	}
	var Count int64 = 0
	if Err := Where.Count(&Count).Error; Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}
	With := Where.Preload("Province").Preload("District").Preload("Images").Preload("Owner").Preload("SellType").Preload("AssetType")
	Sorted := With.Order(clause.OrderByColumn{Column: clause.Column{Name: OrderBy}, Desc: IsDesc})
	InPage := Sorted.Limit(Limit).Offset(Offset)
	if Err := InPage.Find(&response).Error; Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	Total := len(response)
	totalPage := int64(math.Ceil(float64(Count) / float64(len(response))))
	c.JSON(http.StatusOK, types.Response{
		Code:      http.StatusOK,
		Status:    true,
		Message:   utils.NullableString("Search sell"),
		Data:      response,
		Page:      &Page,
		Limit:     &Limit,
		Total:     &Total,
		TotalPage: &totalPage,
	})
}

func MySell(c *gin.Context) {
	var response []models.Sell
	var user models.User

	if Err := user.GetFromRequest(c); Err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	DB, ErrDB := database.Conn()
	if ErrDB != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Status:  false,
			Message: utils.NullableString(ErrDB.Error()),
		})
		return
	}
	defer database.Close(DB)

	QueryLimit := c.DefaultQuery("limit", "10")
	QueryPage := c.DefaultQuery("page", "1")
	OrderBy := c.DefaultQuery("order_by", "created_at")
	Sort := c.DefaultQuery("sort", "desc")
	IsDesc := strings.ToLower(Sort) != "asc"
	Limit, ErrLimit := strconv.Atoi(QueryLimit)
	Page, ErrPage := strconv.Atoi(QueryPage)
	if ErrLimit != nil {
		Limit = 10
	}
	if ErrPage != nil {
		Page = 1
	}
	Offset := utils.Offset(Page, Limit)

	Model := DB.Model(&models.Sell{})
	Where := Model.Where("owner_id=?", user.ID)
	var Count int64 = 0
	if Err := Where.Count(&Count).Error; Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}
	With := Where.Preload("Province").Preload("District").Preload("Images").Preload("Owner").Preload("SellType").Preload("AssetType")
	Sorted := With.Order(clause.OrderByColumn{Column: clause.Column{Name: OrderBy}, Desc: IsDesc})
	InPage := Sorted.Limit(Limit).Offset(Offset)
	if Err := InPage.Find(&response).Error; Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	Total := len(response)
	totalPage := int64(math.Ceil(float64(Count) / float64(len(response))))
	c.JSON(http.StatusOK, types.Response{
		Code:      http.StatusOK,
		Status:    true,
		Message:   utils.NullableString("Search sell"),
		Data:      response,
		Page:      &Page,
		Limit:     &Limit,
		Total:     &Total,
		TotalPage: &totalPage,
	})
}

func PublishSell(c *gin.Context) {
	var request request.PublishSellRequest
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

	if Err := DB.Where("id=?", request.SellID).First(&response).Error; Err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	if response.OwnerID != user.ID {
		c.JSON(http.StatusForbidden, types.Response{
			Code:    http.StatusForbidden,
			Status:  false,
			Message: utils.NullableString("You are not the owner of this sell"),
		})
		return
	}

	response.IsPublished = true
	if Err := DB.Save(&response).Error; Err != nil {
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
		Message: utils.NullableString("Publish sell"),
		Data:    &response,
	})
}

func PrivateSell(c *gin.Context) {
	var request request.PrivateSellRequest
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

	if Err := DB.Where("id=?", request.SellID).First(&response).Error; Err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	if response.OwnerID != user.ID {
		c.JSON(http.StatusForbidden, types.Response{
			Code:    http.StatusForbidden,
			Status:  false,
			Message: utils.NullableString("You are not the owner of this sell"),
		})
		return
	}

	response.IsPublished = false
	if Err := DB.Save(&response).Error; Err != nil {
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
		Message: utils.NullableString("Sell is private"),
		Data:    &response,
	})
}
