package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

func (AssetTag) TableName() string {
	return "asset_tag"
}

type AssetTag struct {
	template.Model
	AssetID uint   `json:"asset_id"`
	TagID   uint   `json:"tag_id"`
	Asset   *Asset `json:"asset" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:AssetID"`
	Tag     *Tag   `json:"tag" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:TagID"`
}
