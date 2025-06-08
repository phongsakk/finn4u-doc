package general

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
	request "github.com/phongsakk/finn4u-back/app/request/general"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
	"gorm.io/gorm"
)

func Register(c *gin.Context) {
	var request request.RegisterGeneralUserRequest

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
	user.UserRoleID = 1
	user.Password = hashedPassword
	user.Email = request.Email
	user.UserPrefixID = int(request.UserPrefixId)
	user.Firstname = request.Fisrtname
	user.Lastname = request.Lastname
	user.PhoneNumber = request.PhoneNumber
	user.OnlineRange = request.OnlineRange
	user.AddressNumber = request.AddressNumber
	user.AddressStreet = request.AddressStreet
	user.ProvinceID = request.ProvinceID
	user.DistrictID = request.DistrictID
	user.SubdistrictID = request.SubdistrictID
	user.Email = request.Email

	var otp models.OTP
	if err := db.Transaction(func(tx *gorm.DB) error {
		if err := db.Create(&user).Error; err != nil {
			return err
		}

		otp.UserID = user.ID
		otp.Ref = utils.RandomString(6)
		otp.UserType = "General User"
		otp.Code = utils.RandomNumber(6)
		otp.ExpiredAt = time.Now().Add(time.Minute * 10)
		if err := db.Create(&otp).Error; err != nil {
			return err
		}

		// send OTP here
		utils.SendEmail(user.Email, "OTP Verification", fmt.Sprintf("Your OTP (REF: %s) is %s. Please use it to verify your account.", otp.Ref, otp.Code))
		fmt.Println("OTP sent to", user.Email)

		return nil
	}); err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:    http.StatusInternalServerError,
			Error:   utils.NullableString(err.Error()),
			Message: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(http.StatusCreated, types.Response{
		Code:    http.StatusCreated,
		Status:  true,
		Message: utils.NullableString("User registered successfully"),
		Data: map[string]any{
			"user": user,
			"ref":  otp.Ref,
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

	fmt.Println(accessTokenExpiresIn.Unix())
	c.JSON(200, types.Response{
		Status:  true,
		Code:    http.StatusOK,
		Message: utils.NullableString("Logged in successfully"),
		Data: map[string]any{
			"access_token":       accessToken,
			"refresh_token":      refreshToken,
			"access_expires_in":  accessTokenExpiresIn.Unix(),
			"refresh_expires_in": refreshTokenExpiresIn.Unix(),
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

func ResendOTP(c *gin.Context) {
	var request request.ResendOTPRequest
	if err := c.ShouldBindJSON(&request); err != nil {
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
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Where("email=?", request.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Error:   utils.NullableString(err.Error()),
			Message: utils.NullableString("User not found"),
		})
		return
	}
	var otp models.OTP
	if err := db.Transaction(func(trx *gorm.DB) error {
		if err := trx.First(&otp, "user_id=?", user.ID).Error; err != nil {
			return errors.New("OTP not found")
		}
		otp.Ref = utils.RandomString(6)
		otp.Code = utils.RandomNumber(6)
		otp.ExpiredAt = time.Now().Add(time.Minute * 10)

		if err := trx.Save(&otp).Error; err != nil {
			return err
		}
		utils.SendEmail(user.Email, "OTP Verification", fmt.Sprintf("Your OTP (REF: %s) is %s. Please use it to verify your account.", otp.Ref, otp.Code))
		fmt.Println("OTP sent to", user.Email)
		return nil
	}); err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(http.StatusCreated, types.Response{
		Code:    http.StatusCreated,
		Status:  true,
		Message: utils.NullableString("OTP resent successfully"),
		Data: map[string]any{
			"ref": otp.Ref,
		},
	})
}

func VerifyOTP(c *gin.Context) {
	var request request.VerifyOTPRequest
	if err := c.ShouldBindJSON(&request); err != nil {
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
	var otp models.OTP
	var user models.User

	db, err := database.Conn()
	if err != nil {
		c.JSON(http.StatusInternalServerError, types.Response{
			Code:  http.StatusInternalServerError,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	defer database.Close(db)
	if err := db.Where("email = ?", request.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Error:   utils.NullableString(err.Error()),
			Message: utils.NullableString("User not found"),
		})
		return
	}
	if err := db.Where("user_id = ? AND code = ?", user.ID, request.Code).First(&otp).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Error:   utils.NullableString(err.Error()),
			Message: utils.NullableString("Invalid OTP"),
		})
		return
	}
	if otp.ExpiredAt.Before(time.Now()) {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Error:   utils.NullableString("OTP has expired"),
			Message: utils.NullableString("OTP has expired"),
		})
		return
	}

	db.Model(&user).UpdateColumn("verified", true)
	db.Delete(&otp)

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
	c.JSON(http.StatusCreated, types.Response{
		Code:    http.StatusCreated,
		Status:  true,
		Message: utils.NullableString("Consignor verified successfully"),
		Data: types.AuthResponse{
			AccessToken:      accessToken,
			RefreshToken:     refreshToken,
			ExpiresIn:        accessTokenExpiresIn.Unix(),
			RefreshExpiresIn: refreshTokenExpiresIn.Unix(),
		},
	})
}

func Profile(c *gin.Context) {
	var user models.User

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
