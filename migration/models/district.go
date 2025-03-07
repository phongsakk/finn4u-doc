package models

import "migration/models/template"

func (District) TableName() string {
	return "district"
}

type District struct {
	template.Model
	template.NameMultiLanguage
	ProvinceID uint     `json:"province_id" gorm:"not null"`
	Province   Province `json:"province" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:ProvinceID"`
}
