package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/skeletons"
)

func (Province) TableName() string {
	return "province"
}

type Province struct {
	skeletons.Model
	skeletons.NameMultiLanguage
}
