package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (AssetType) TableName() string {
	return "asset_type"
}

type AssetType struct {
	template.Model
	template.NameMultiLanguage
}
