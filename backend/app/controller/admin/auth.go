package admin

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/app/request"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func Login(c *gin.Context) {
	var request request.Connect

	if err := c.ShouldBindBodyWithJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	if err := request.Validated(); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	var user models.Admin
	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Where("email =?", request.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString("User not found"),
		})
		return
	}
	if !utils.CheckPasswordHash(request.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString("Invalid password"),
		})
		return
	}

	accessToken, accessTokenExpiresIn, errAccess := user.GenerateAccessToken()
	if errAccess != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(errAccess.Error()),
		})
		return
	}
	refreshToken, refreshTokenExpiresIn, errRefresh := user.GenerateRefreshToken()
	if errRefresh != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(errRefresh.Error()),
		})
		return
	}
	c.JSON(200, types.Response{
		Status:  true,
		Code:    http.StatusOK,
		Message: utils.NullableString("Logged in successfully"),
		Data: types.AuthResponse{
			AccessToken:      accessToken,
			RefreshToken:     refreshToken,
			ExpiresIn:        accessTokenExpiresIn.Unix(),
			RefreshExpiresIn: refreshTokenExpiresIn.Unix(),
		},
	})
}

func RefreshToken(c *gin.Context) {
	var request request.RefreshToken

	if err := c.ShouldBindBodyWithJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	if err := request.Validated(); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	var user models.Admin
	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := user.ValidateRefreshToken(request.RefreshToken); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusUnauthorized,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	if err := db.Where("id=?", user.ID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString("User not found"),
		})
		return
	}

	accessToken, accessTokenExpiresIn, errAccess := user.GenerateAccessToken()
	if errAccess != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(errAccess.Error()),
		})
		return
	}
	refreshToken, refreshTokenExpiresIn, errRefresh := user.GenerateRefreshToken()
	if errRefresh != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(errRefresh.Error()),
		})
		return
	}
	c.JSON(200, types.Response{
		Status:  true,
		Code:    http.StatusOK,
		Message: utils.NullableString("Logged in successfully"),
		Data: map[string]any{
			"access_token":       accessToken,
			"refresh_token":      refreshToken,
			"access_expires_in":  accessTokenExpiresIn,  // 5 minutes
			"refresh_expires_in": refreshTokenExpiresIn, // 1 day
		},
	})

}

func Profile(c *gin.Context) {
	var user models.Admin

	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Error:   utils.NullableString(err.Error()),
			Message: utils.NullableString("Invalid token"),
		})
		return
	}
	db, errDb := database.Conn()
	if errDb != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(errDb.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Model(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:  http.StatusUnauthorized,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:   http.StatusOK,
		Status: true,
		Data:   user,
	})
}
