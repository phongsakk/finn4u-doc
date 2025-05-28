package admin

import (
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	request "github.com/phongsakk/finn4u-back/app/request/admin"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm/clause"
)

// FUCKS - [F]ind [U]pdate [C]reate [K]ill [S]earch

func FindSell(c *gin.Context) {
	//
}

func UpdateSell(c *gin.Context) {
	var user models.Admin
	var response models.Sell
	var request request.AdminUpdateSellRequest

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
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Status:  false,
			Message: utils.NullableString(ErrDB.Error()),
		})
		return
	}
	defer database.Close(DB)

	if Err := DB.Model(&models.Sell{}).Where("id=?", request.SellID).First(&response).Error; Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	response.IsDisabled = true
	if Err := DB.Save(&response).Error; Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Status:  false,
			Message: utils.NullableString(Err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Update sell"),
		Data:    &response,
	})
}

func CreateSell(c *gin.Context) {
	//
}

func KillSell(c *gin.Context) {
	//
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
	Where := Model
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

func SetSellAsRecommended(c *gin.Context) {
	var sellID = c.Param("id")
	var sell models.Sell

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
