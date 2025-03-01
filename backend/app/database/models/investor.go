package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

type Investor struct {
	template.Model
	template.User
	Beneficiary      string    `json:"beneficiary" gorm:"not null"`
	Relation         string    `json:"relation" gorm:"not null"`
	DistrictId       int       `json:"district_id" gorm:"not null"`
	AssetTypeId      int       `json:"asset_type_id" gorm:"not null"`
	InvestmentAmount float64   `json:"investment_amount" gorm:"not null"`
	District         District  `json:"district" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:DistrictId"`
	AssetType        AssetType `json:"asset_type" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:AssetTypeId"`
}

func (Investor) TableName() string {
	return "investor"
}
