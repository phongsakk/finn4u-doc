package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func AuthMiddleware(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, types.Response{
			Status:  false,
			Code:    http.StatusUnauthorized,
			Message: utils.NullableString("No token provided"),
		})
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	var user models.User
	var tokenWithoutBearer = strings.Replace(token, "Bearer ", "", -1)
	if err := user.ValidateToken(tokenWithoutBearer); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Status:  false,
			Code:    http.StatusUnauthorized,
			Message: utils.NullableString("Invalid token"),
			Error:   utils.NullableString(err.Error()),
		})
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	c.Set("user", user)
	c.Next()
}

func AdminAuthMiddleware(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, types.Response{
			Status:  false,
			Code:    http.StatusUnauthorized,
			Message: utils.NullableString("No token provided"),
		})
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	var user models.Admin
	var tokenWithoutBearer = strings.Replace(token, "Bearer ", "", -1)
	if err := user.ValidateToken(tokenWithoutBearer); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Status:  false,
			Code:    http.StatusUnauthorized,
			Message: utils.NullableString("Invalid token"),
			Error:   utils.NullableString(err.Error()),
		})
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	c.Set("user", user)
	c.Next()
}
