package models

import (
	"errors"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models/template"
	"github.com/phongsakk/finn4u-back/types"
)

type Consignor struct {
	template.Model
	template.User
	GenID string `json:"gen_id" gorm:"not null;index;unique;"`

	UserPrefix *UserPrefix `json:"user_prefix" gorm:"foreignKey:UserPrefixID;references:ID"`
}

func (Consignor) TableName() string {
	return "consignor"
}

func (user *Consignor) GetFromRequest(c *gin.Context) error {
	auth, ok := c.Get("user")
	if !ok {
		return errors.New("failed to get user from request")
	}
	_user := auth.(Consignor)
	*user = _user
	return nil
}

func (user *Consignor) GenerateAccessToken() (string, *time.Time, error) {
	expiredAt := time.Now().Add(time.Minute * 5)
	claims := types.Auth{
		UserId: user.ID,
		Email:  user.Email,
		Exp:    expiredAt.Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(template.SecretKeyAccess)
	if err != nil {
		return "", nil, err
	}
	return tokenString, &expiredAt, nil
}

func (user *Consignor) ValidateToken(encodedToken string) error {
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

func (user *Consignor) GenerateRefreshToken() (string, *time.Time, error) {
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

func (user *Consignor) SearchBidOffer(assets *[]Asset) error {
	db, dbError := database.Conn()
	if dbError != nil {
		return dbError
	}
	defer database.Close(db)

	return db.Joins("AssetBidOffer").Where("\"AssetBidOffer\".bidder_id = ?", user.ID).Preload("AssetBidOffer").Find(&assets).Error
}

func (user Consignor) FindBidOffer(assets *Asset, AssetID int) error {
	db, dbError := database.Conn()
	if dbError != nil {
		return dbError
	}
	defer database.Close(db)
	return db.Joins("AssetBidOffer").
		Where("asset.id = ? AND AssetBidOffer.bidder_id = ?", AssetID, user.ID).
		Preload("AssetBidOffer").
		Find(&assets).Error
}

func (user Consignor) FindInvestmentOffer(assets *Asset, AssetID int) error {
	db, dbError := database.Conn()
	if dbError != nil {
		return dbError
	}
	defer database.Close(db)
	return db.Joins("AssetInvestmentOffer").
		Where("asset.id = ? AND AssetInvestmentOffer.bidder_id = ?", AssetID, user.ID).
		Preload("AssetInvestmentOffer").
		Find(&assets).Error
}
