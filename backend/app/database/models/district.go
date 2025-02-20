package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (District) TableName() string {
	return "district"
}

type District struct {
	template.Model
	template.NameMultiLanguage
}
