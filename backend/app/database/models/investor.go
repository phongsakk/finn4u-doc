package models

import (
	"errors"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/phongsakk/finn4u-back/app/database/models/template"
	"github.com/phongsakk/finn4u-back/types"
)

type Investor struct {
	template.Model
	template.User
	Beneficiary        string     `json:"beneficiary" gorm:"not null"`
	Relation           string     `json:"relation" gorm:"not null"`
	InterestDistrictID *uint      `json:"interest_district_id" gorm:"default:null"`
	AssetTypeID        uint       `json:"asset_type_id" gorm:"not null"`
	InvestmentAmount   float64    `json:"investment_amount" gorm:"not null"`
	InterestDistrict   *District  `json:"district" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:InterestDistrictID"`
	AssetType          *AssetType `json:"asset_type" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:AssetTypeID"`
}

func (user *Investor) GetFromRequest(c *gin.Context) error {
	auth, ok := c.Get("user")
	if !ok {
		return errors.New("failed to get user from request")
	}
	_user := auth.(Investor)
	*user = _user
	return nil
}

func (Investor) TableName() string {
	return "investor"
}

func (user *Investor) GenerateAccessToken() (string, *time.Time, error) {
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

func (user *Investor) GenerateRefreshToken() (string, *time.Time, error) {
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
