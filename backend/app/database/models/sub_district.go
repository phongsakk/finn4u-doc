package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type SubDistrict struct {
	template.Model
	template.NameMultiLanguage
	DistrictID uint     `json:"district_id" gorm:"not null"`
	ZipCode    string   `json:"zip_code" gorm:"not null"`
	District   District `json:"district,omitempty" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:DistrictID"`
}

func (SubDistrict) TableName() string {
	return "sub_district"
}
