package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

type UserRole struct {
	template.Model

	Name   string `json:"name" gorm:"type:varchar(128);not null"`
	NameTh string `json:"name_th" gorm:"type:varchar(128)"`
	NameEn string `json:"name_en" gorm:"type:varchar(128)"`
	NameCn string `json:"name_cn" gorm:"type:varchar(128)"`
}

func (UserRole) TableName() string {
	return "user_role"
}
