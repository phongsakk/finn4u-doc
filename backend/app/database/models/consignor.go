package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type Congisnor struct {
	template.Model
	template.User
}

func (Congisnor) TableName() string {
	return "congisnor"
}
