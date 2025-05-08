package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func AuthMiddleware(mode types.AuthMode) func(c *gin.Context) {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		fmt.Println(mode)
		if token == "" {
			fmt.Println("You must provide")
			if mode == libs.AUTH_STRICT {
				fmt.Println("Strict mode")
				c.JSON(http.StatusUnauthorized, types.Response{
					Status:  false,
					Code:    http.StatusUnauthorized,
					Message: utils.NullableString("No token provided"),
				})
				c.AbortWithStatus(http.StatusUnauthorized)
			} else {
				fmt.Println("Non-strict mode")
				c.Next()
			}
			return
		}

		var user models.User
		var tokenWithoutBearer = strings.Replace(token, "Bearer ", "", -1)
		if err := user.ValidateToken(tokenWithoutBearer); err != nil {
			if mode == libs.AUTH_STRICT {

				c.JSON(http.StatusUnauthorized, types.Response{
					Status:  false,
					Code:    http.StatusUnauthorized,
					Message: utils.NullableString("Invalid token"),
					Error:   utils.NullableString(err.Error()),
				})
				c.AbortWithStatus(http.StatusUnauthorized)
			} else {
				c.Next()
			}
			return
		}

		c.Set("user", user)
		c.Next()
	}

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

func ConsignorAuthMiddleware(c *gin.Context) {
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

	var user models.Consignor
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
