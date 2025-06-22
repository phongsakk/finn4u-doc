package models

import (
	"errors"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models/template"
	"github.com/phongsakk/finn4u-back/app/libs"
	"github.com/phongsakk/finn4u-back/types"
)

type Admin struct {
	template.Model
	template.User

	Prefix      *UserPrefix  `json:"prefix" gorm:"foreignKey:UserPrefixID;"`
	Province    *Province    `json:"province" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:ProvinceID"`
	District    *District    `json:"district" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:DistrictID"`
	SubDistrict *SubDistrict `json:"sub_district" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:SubDistrictID"`
}

func (Admin) TableName() string {
	return "admin"
}

func (user *Admin) GetFromRequest(c *gin.Context) error {
	auth, ok := c.Get("user")
	if !ok {
		return errors.New("failed to get admin from request")
	}
	_user := auth.(Admin)
	*user = _user
	return nil
}

// creates a new access token for a user
func (user *Admin) GenerateAccessToken() (string, *time.Time, error) {
	expiredAt := time.Now().Add(time.Minute * 5)
	claims := types.Auth{
		UserId: user.ID,
		Email:  user.Email,
		Exp:    expiredAt.Unix(),
		Type:   libs.USER_ADMIN,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(template.SecretKeyAccess)
	if err != nil {
		return "", nil, err
	}
	return tokenString, &expiredAt, nil
}

// Validate and parse the JWT token
func (user *Admin) ValidateToken(encodedToken string) error {
	claims := &types.Auth{}

	decoded, err := jwt.ParseWithClaims(encodedToken, claims, func(token *jwt.Token) (any, error) {
		if _, isvalid := token.Method.(*jwt.SigningMethodHMAC); !isvalid {
			return nil, fmt.Errorf("invalid token %v", token.Header["alg"])
		}
		return template.SecretKeyAccess, nil
	})

	if err != nil {
		return err
	}

	if !decoded.Valid {
		return errors.New("token is invalid")
	}

	user.Email = claims.Email
	user.ID = claims.UserId
	db, err := database.Conn()
	if err != nil {
		return err
	}
	defer database.Close(db)

	if err := db.Where("id = ? AND email = ?", user.ID, user.Email).First(&user).Error; err != nil {
		return err
	}

	return nil
}

func (user *Admin) ValidateRefreshToken(encodedToken string) error {
	claims := &types.Auth{}

	decoded, err := jwt.ParseWithClaims(encodedToken, claims, func(token *jwt.Token) (any, error) {
		if _, isvalid := token.Method.(*jwt.SigningMethodHMAC); !isvalid {
			return nil, fmt.Errorf("invalid token %v", token.Header["alg"])
		}
		return template.SecretKeyRefresh, nil
	})

	if err != nil {
		return err
	}

	if !decoded.Valid {
		return errors.New("token is invalid")
	}

	user.Email = claims.Email
	user.ID = claims.UserId
	db, err := database.Conn()
	if err != nil {
		return err
	}
	defer database.Close(db)

	if err := db.Where("id = ? AND email = ?", user.ID, user.Email).First(&user).Error; err != nil {
		return err
	}

	return nil
}

func (user *Admin) ParseRefreshToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return template.SecretKeyRefresh, nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func (user *Admin) GenerateRefreshToken() (string, *time.Time, error) {
	expiredAt := time.Now().Add(time.Hour * 24)
	claims := jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     expiredAt.Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(template.SecretKeyRefresh)
	if err != nil {
		return "", nil, err
	}
	return tokenString, &expiredAt, nil
}
