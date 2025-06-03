package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (SellType) TableName() string {
	return "sell_type"
}

type SellType struct {
	template.Model
	template.NameMultiLanguage
}
