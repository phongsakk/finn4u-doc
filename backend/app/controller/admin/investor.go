package admin

import (
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm/clause"
)

// FUCKS - Find, Update, Create, Kill, Search
func FindInvestors(c *gin.Context) {
	QueryPage := c.DefaultQuery("page", "1")
	QueryLimit := c.DefaultQuery("limit", "20")
	QueryKeyword := c.DefaultQuery("keyword", "")
	QueryOrderBy := c.DefaultQuery("order", "created_at")
	QuerySort := c.DefaultQuery("sort", "desc")

	var Response []models.Investor
	var User models.Admin
	if Err := User.GetFromRequest(c); Err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Message: utils.NullableString(Err.Error()),
			Error:   utils.NullableString(Err.Error()),
		})
		return
	}

	Page, ErrPage := strconv.Atoi(QueryPage)
	if ErrPage != nil || Page <= 0 {
		Page = 1
	}

	Limit, ErrLimit := strconv.Atoi(QueryLimit)
	if ErrLimit != nil || Limit <= 0 {
		Limit = 20
	}

	Offset := utils.Offset(Page, Limit)

	Db, ErrDb := database.Conn()
	if ErrDb != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Message: utils.NullableString(ErrDb.Error()),
			Error:   utils.NullableString(ErrDb.Error()),
		})
		return
	}
	defer database.Close(Db)

	Model := Db.Model(&models.Investor{})
	Preloaded := Model.Preload("InterestDistrict").Preload("InterestDistrict.Province").Preload("AssetType")
	Where := Preloaded.Where("deleted_at IS NULL")
	if QueryKeyword != "" {
		Where = Where.Where("firstname LIKE ?", "%"+QueryKeyword+"%").Or("lastname LIKE ?", "%"+QueryKeyword+"%")
	}
	Prepared := Where.Order(clause.OrderByColumn{Column: clause.Column{Name: QueryOrderBy}, Desc: strings.ToLower(QuerySort) != "asc"})
	var TotalRecord int64 = 0
	if Err := Prepared.Count(&TotalRecord).Error; Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Message: utils.NullableString(Err.Error()),
			Error:   utils.NullableString(Err.Error()),
		})
		return
	}
	Prepared = Prepared.Offset(Offset).Limit(Limit)
	if Err := Prepared.Find(&Response).Error; Err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Message: utils.NullableString(Err.Error()),
			Error:   utils.NullableString(Err.Error()),
		})
		return
	}

	Total := len(Response)
	TotalPage := int64(math.Ceil(float64(TotalRecord) / float64(len(Response))))
	c.JSON(http.StatusOK, types.Response{
		Code:      http.StatusOK,
		Message:   utils.NullableString("success"),
		Data:      &Response,
		Page:      &Page,
		Limit:     &Limit,
		Total:     &Total,
		TotalPage: &TotalPage,
	})
}

func UpdateInvestor(c *gin.Context) {
	// Implement the logic to update an investor
}

func CreateInvestor(c *gin.Context) {
	// Implement the logic to create a new investor
}

func KillInvestor(c *gin.Context) {
	// Implement the logic to delete an investor
}

func SearchInvestor(c *gin.Context) {
	// Implement the logic to search for investors by keyword
}
