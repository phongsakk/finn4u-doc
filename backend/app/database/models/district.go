package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/skeletons"
)

func (District) TableName() string {
	return "district"
}

type District struct {
	skeletons.Model
	skeletons.NameMultiLanguage
}
