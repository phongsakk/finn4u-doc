package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type AssetImage struct {
	template.Model
	Image   string `json:"image" gorm:"not null"`
	AssetID uint   `json:"asset_id" gorm:"not null"`
	Asset   Asset  `json:"asset" gorm:"foreignKey:AssetID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
