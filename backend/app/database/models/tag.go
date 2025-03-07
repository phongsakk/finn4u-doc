package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

func (Tag) TableName() string {
	return "tag"
}

type Tag struct {
	template.Model
	template.NameMultiLanguage
	AssetID uint   `json:"asset_id"`
	Asset   *Asset `json:"asset" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:AssetID"`
}
