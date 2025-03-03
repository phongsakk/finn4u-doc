package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	"github.com/phongsakk/finn4u-back/app/request"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm"
)

func Connect(c *gin.Context) {
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
		Data: map[string]interface{}{
			"access_token":       accessToken,
			"refresh_token":      refreshToken,
			"access_expires_in":  accessTokenExpiresIn.Format(time.RFC3339),
			"refresh_expires_in": refreshTokenExpiresIn.Format(time.RFC3339),
		},
	})
}

func Login(c *gin.Context) {
	var request request.Login

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

	var user models.User
	db, err := database.Conn()
	defer database.Close(db)
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
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
		Data: map[string]interface{}{
			"access_token":       accessToken,
			"refresh_token":      refreshToken,
			"access_expires_in":  accessTokenExpiresIn.Format(time.RFC3339),
			"refresh_expires_in": refreshTokenExpiresIn.Format(time.RFC3339),
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

	fmt.Println(request)

	var user models.User
	db, err := database.Conn()
	defer database.Close(db)
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	if err := db.Where("email =?", "user1@email.net").First(&user).Error; err != nil {
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
		Data: map[string]interface{}{
			"access_token":       accessToken,
			"refresh_token":      refreshToken,
			"access_expires_in":  accessTokenExpiresIn.Format(time.RFC3339),  // 5 minutes
			"refresh_expires_in": refreshTokenExpiresIn.Format(time.RFC3339), // 1 day
		},
	})
}

func VerifyToken(c *gin.Context) {
	// auth := c.GetHeader("Authorization")
	// if auth == "" {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing authorization header"})
	// 	return
	// }
	// tokenString := auth[len("Bearer "):]
	// token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
	// 	return secretKey, nil
	// })
	// if err != nil {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
	// 	return
	// }
	// if !token.Valid {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is invalid"})
	// 	return
	// }
}

func Register(c *gin.Context) {

}
func Enroll(c *gin.Context) {
	var request request.Enroll

	if err := c.ShouldBindBodyWithJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
	}

	if err := utils.Validate(request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	var user models.Investor
	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Where("email =?", request.Email).First(&user).Error; err == nil {
		c.JSON(http.StatusConflict, types.Response{
			Code:  http.StatusConflict,
			Error: utils.NullableString("Email already registered"),
		})
		return
	}

	if request.Password != request.ConfirmPassword {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("Passwords do not match"),
		})
		return
	}
	hashedPassword, err := utils.Hash(request.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	user.UserRoleID = 3
	user.Password = hashedPassword
	user.Email = request.Email
	user.UserPrefixID = int(request.UserPrefixId)
	user.Firstname = request.Fisrtname
	user.Lastname = request.Lastname
	user.PhoneNumber = request.PhoneNumber
	user.OnlineRange = request.OnlineRange
	user.CareerID = request.CareerId
	user.IncomePerMonth = request.IncomePerMonth
	user.AddressNumber = request.AddressNumber
	user.AddressStreet = request.AddressStreet
	user.ProvinceID = request.ProvinceId
	user.DistrictID = request.DistrictId
	user.SubdistrictID = request.SubdistrictId
	user.Email = request.Email
	user.Beneficiary = request.Beneficiary
	user.Relation = request.Relation
	user.InterestDistrictID = request.InterestDistrictID
	user.AssetTypeID = request.AssetTypeId
	user.InvestmentAmount = request.InvestmentAmount

	db.Transaction(func(tx *gorm.DB) error {
		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return err
		}

		var otp models.OTP
		otp.UserID = user.ID
		otp.Ref = utils.RandomString(6)
		otp.UserType = "Investor"
		otp.Code = utils.RandomNumber(6)
		otp.ExpiredAt = time.Now().Add(time.Minute * 10)
		if err := db.Create(&otp).Error; err != nil {
			return err
		}

		// send OTP here

		return nil
	})

	c.JSON(http.StatusCreated, types.Response{
		Code:    http.StatusCreated,
		Status:  true,
		Message: utils.NullableString("User registered successfully"),
		Data:    user,
	})
}
func Signup(c *gin.Context) {
	var request request.Signup

	if err := c.ShouldBindBodyWithJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
	}

	if err := utils.Validate(request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	var user models.Congisnor
	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Where("email =?", request.Email).First(&user).Error; err == nil {
		c.JSON(http.StatusConflict, types.Response{
			Code:  http.StatusConflict,
			Error: utils.NullableString("Email already registered"),
		})
		return
	}

	if request.Password != request.ConfirmPassword {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString("Passwords do not match"),
		})
		return
	}
	hashedPassword, err := utils.Hash(request.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	user.UserRoleID = 2
	user.Password = hashedPassword
	user.Email = request.Email
	user.UserPrefixID = int(request.UserPrefixId)
	user.Firstname = request.Fisrtname
	user.Lastname = request.Lastname
	user.PhoneNumber = request.PhoneNumber
	user.OnlineRange = request.OnlineRange
	user.CareerID = request.CareerId
	user.IncomePerMonth = request.IncomePerMonth
	user.AddressNumber = request.AddressNumber
	user.AddressStreet = request.AddressStreet
	user.ProvinceID = request.ProvinceId
	user.DistrictID = request.DistrictId
	user.SubdistrictID = request.SubdistrictId
	user.Email = request.Email

	db.Transaction(func(tx *gorm.DB) error {
		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, types.Response{
				Code:  http.StatusInternalServerError,
				Error: utils.NullableString(err.Error()),
			})
			return err
		}

		var otp models.OTP
		otp.UserID = user.ID
		otp.Ref = utils.RandomString(6)
		otp.UserType = "Congisnor"
		otp.Code = utils.RandomNumber(6)
		otp.ExpiredAt = time.Now().Add(time.Minute * 10)
		if err := db.Create(&otp).Error; err != nil {
			return err
		}

		// send OTP here

		return nil
	})

	c.JSON(http.StatusCreated, types.Response{
		Code:    http.StatusCreated,
		Status:  true,
		Message: utils.NullableString("User registered successfully"),
		Data:    user,
	})
}

func ForgotPassword(c *gin.Context) {

}

func ResetPassword(c *gin.Context) {
	data, err := utils.Hash("123456")
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Status: false,
			Code:   http.StatusInternalServerError,
			Error:  utils.NullableString(err.Error()),
		})
		return
	}
	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Password reset successfully"),
		Data:    data,
	})
}
