package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type AssetAppraisal struct {
	template.Model
	AssetID        uint    `json:"asset_id"`
	PriceAppraisal float64 `json:"price_appraisal,omitempty"`
	CollateraPrice float64 `json:"collateral_price"`
	Duration       int     `json:"duration"`
	Asset          *Asset  `json:"asset,omitempty" gorm:"foreignKey:AssetID;references:ID"`
}

func (AssetAppraisal) TableName() string {
	return "asset_appraisal"
}
