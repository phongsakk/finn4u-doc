package models

import "migration/models/template"

func (District) TableName() string {
	return "district"
}

type District struct {
	template.Model
	template.NameMultiLanguage
}
