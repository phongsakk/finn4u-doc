package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (Province) TableName() string {
	return "province"
}

type Province struct {
	template.Model
	template.NameMultiLanguage
}
