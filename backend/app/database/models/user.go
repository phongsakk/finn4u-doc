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

func (User) TableName() string {
	return "user"
}

type User struct {
	template.Model
	template.User
	Prefix      *UserPrefix  `json:"prefix" gorm:"foreignKey:UserPrefixID;"`
	Province    *Province    `json:"province" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:ProvinceID"`
	District    *District    `json:"district" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:DistrictID"`
	SubDistrict *SubDistrict `json:"sub_district" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:SubDistrictID"`
}

func (user *User) GetFromRequest(c *gin.Context) error {
	auth, ok := c.Get("user")
	if !ok {
		return errors.New("failed to get user from request")
	}
	_user := auth.(User)
	*user = _user
	return nil
}

func (user *User) GenerateAccessToken() (string, *time.Time, error) {
	expiredAt := time.Now().Add(time.Minute * 5)
	claims := types.Auth{
		UserId: user.ID,
		Email:  user.Email,
		Exp:    expiredAt.Unix(),
		Type:   libs.USER_GENERAL,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(template.SecretKeyAccess)
	if err != nil {
		return "", nil, err
	}
	return tokenString, &expiredAt, nil
}

func (user *User) ValidateToken(encodedToken string) error {
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

func (user *User) ValidateRefreshToken(encodedToken string) error {
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

func (user *User) GenerateRefreshToken() (string, *time.Time, error) {
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
