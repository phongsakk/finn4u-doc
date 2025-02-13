package models

import "gorm.io/gorm"

type Investor struct {
	gorm.Model
	UserId           int     `gorm:"index"`
	Beneficiary      string  `gorm:"not null"`
	Relation         string  `gorm:"not null"`
	DistrictId       int     `gorm:"not null"`
	AssetTypeId      int     `gorm:"not null"`
	InvestmentAmount float64 `gorm:"not null"`
	User             User    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:UserId"`
	// District         District  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:DistrictId"`
	// AssetType        AssetType `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:AssetTypeId"`
}
