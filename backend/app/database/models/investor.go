package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
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

func (Investor) TableName() string {
	return "investor"
}
