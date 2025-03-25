package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

func (UserPrefix) TableName() string {
	return "user_prefix"
}

type UserPrefix struct {
	template.Model
	template.NameMultiLanguage
}
