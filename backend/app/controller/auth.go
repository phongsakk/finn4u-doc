package controller

import (
	"errors"
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
		Data: types.AuthResponse{
			AccessToken:      accessToken,
			RefreshToken:     refreshToken,
			ExpiresIn:        accessTokenExpiresIn.Unix(),
			RefreshExpiresIn: refreshTokenExpiresIn.Unix(),
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
			"access_expires_in":  accessTokenExpiresIn,
			"refresh_expires_in": refreshTokenExpiresIn,
		},
	})
}

func SignIn(c *gin.Context) {
	var request request.SignIn

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

	var user models.Consignor
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
			Error: utils.NullableString("Consignor not found"),
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
		Data: map[string]any{
			"access_token":       accessToken,
			"refresh_token":      refreshToken,
			"access_expires_in":  accessTokenExpiresIn,  // 5 minutes
			"refresh_expires_in": refreshTokenExpiresIn, // 1 day
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

	var otp models.OTP
	if err := db.Transaction(func(tx *gorm.DB) error {
		if err := db.Create(&user).Error; err != nil {
			return err
		}

		otp.UserID = user.ID
		otp.Ref = utils.RandomString(6)
		otp.UserType = "Investor"
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

func InvestorResendOTP(c *gin.Context) {
	var request request.InvestorResendOTP
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
	if err := db.Where("email = ?", request.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, types.Response{
			Code:    http.StatusNotFound,
			Error:   utils.NullableString(err.Error()),
			Message: utils.NullableString("User not found"),
		})
		return
	}
	var otp models.OTP
	if err := db.Transaction(func(trx *gorm.DB) error {
		if err := trx.First(&otp, "user_id = ?", user.ID).Error; err != nil {
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

func InvestorVerifyOtp(c *gin.Context) {
	var request request.InvestorVerifyOTP
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

func InvestorRegister(c *gin.Context) {
	var request request.Enroll

	if err := c.ShouldBindBodyWithJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
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

	var otp models.OTP
	if Err := db.Transaction(func(tx *gorm.DB) error {
		if err := db.Create(&user).Error; err != nil {
			return err
		}

		otp.UserID = user.ID
		otp.Ref = utils.RandomString(6)
		otp.UserType = "Investor"
		otp.Code = utils.RandomNumber(6)
		otp.ExpiredAt = time.Now().Add(time.Minute * 10)
		if err := db.Create(&otp).Error; err != nil {
			return err
		}

		// send OTP here
		utils.SendEmail(user.Email, "OTP Verification", fmt.Sprintf("Your OTP (REF: %s) is %s. Please use it to verify your account.", otp.Ref, otp.Code))
		fmt.Println("OTP sent to", user.Email)

		return nil
	}); Err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Message: utils.NullableString(Err.Error()),
			Error:   utils.NullableString(Err.Error()),
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

func Signup(c *gin.Context) {
	var request request.Signup

	if err := c.ShouldBindBodyWithJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	if err := utils.Validate(request); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}

	var user models.Consignor
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
	user.GenID = fmt.Sprintf("IN%d", time.Now().Unix())

	var otp models.OTP
	if err := db.Transaction(func(tx *gorm.DB) error {
		if err := db.Create(&user).Error; err != nil {
			return err
		}

		otp.UserID = user.ID
		otp.Ref = utils.RandomString(6)
		otp.UserType = "Congisnor"
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

func ConsignorResendOTP(c *gin.Context) {
	var request request.ConsignorResendOTP
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

	var user models.Consignor
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
	var otp models.OTP
	if err := db.Transaction(func(trx *gorm.DB) error {
		if err := trx.First(&otp, "user_id = ?", user.ID).Error; err != nil {
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

func ConsignorVerifyOTP(c *gin.Context) {
	var request request.ConsignorVerifyOTP
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
	var user models.Consignor

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
