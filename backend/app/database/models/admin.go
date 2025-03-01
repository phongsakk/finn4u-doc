package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type Admin struct {
	template.Model
	template.User
}

func (Admin) TableName() string {
	return "admin"
}
