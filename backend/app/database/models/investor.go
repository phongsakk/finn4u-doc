package models

import "gorm.io/gorm"

type Investor struct {
	gorm.Model
	UserId           int       `json:"user_id" gorm:"index"`
	Beneficiary      string    `json:"beneficiary" gorm:"not null"`
	Relation         string    `json:"relation" gorm:"not null"`
	DistrictId       int       `json:"district_id" gorm:"not null"`
	AssetTypeId      int       `json:"asset_type_id" gorm:"not null"`
	InvestmentAmount float64   `json:"investment_amount" gorm:"not null"`
	User             User      `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:UserId"`
	District         District  `json:"district" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:DistrictId"`
	AssetType        AssetType `json:"asset_type" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:AssetTypeId"`
}
