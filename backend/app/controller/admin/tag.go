package admin

import (
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	request "github.com/phongsakk/finn4u-back/app/request/admin"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

// [F]ind
// [U]pdate
// [C]reate
// [K]ill
// [S]earch
func FindTag(c *gin.Context) {
	var tags []models.Tag
	var page = 1
	var take = 20
	var offset = utils.Offset(page, take)
	db, err := database.Conn()
	if err != nil {
		c.JSON(500, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)

	// count all tags
	var totalTags int64
	if err := db.Model(&models.Tag{}).Count(&totalTags).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	// fetch tags with pagination
	if err := db.Order("id").Offset(offset).Limit(take).Find(&tags).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	total := len(tags)
	totalPage := int64(math.Ceil(float64(totalTags) / float64(len(tags))))
	c.JSON(http.StatusOK, types.Response{
		Code:      http.StatusOK,
		Status:    true,
		Data:      tags,
		Page:      &page,
		Limit:     &take,
		Total:     &total,
		TotalPage: &totalPage,
	})
}

func UpdateTag(c *gin.Context) {}

func CreateTag(c *gin.Context) {
	var req request.CreateTag
	if err := c.ShouldBindJSON(&req); err != nil {
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
	var tag models.Tag
	tag.Name = req.Name
	if err := db.Create(&tag).Error; err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Data:    tag,
		Message: utils.NullableString("Tag created successfully"),
	})
}

func KillTag(c *gin.Context) {}

func SearchTag(c *gin.Context) {}
