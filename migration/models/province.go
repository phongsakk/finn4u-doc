package models

import "migration/models/template"

func (Province) TableName() string {
	return "province"
}

type Province struct {
	template.Model
	template.NameMultiLanguage
}
