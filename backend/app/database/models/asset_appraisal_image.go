package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type AssetAppraisalImage struct {
	template.Model
	AssetAppraisalID uint            `json:"asset_appraisal_id"`
	ImageURL         string          `json:"image_url"`
	ImageName        string          `json:"image_name"`
	AssetAppraisal   *AssetAppraisal `json:"asset_appraisal" gorm:"foreignKey:AssetAppraisalID;references:ID"`
}

func (AssetAppraisalImage) TableName() string {
	return "asset_appraisal_image"
}
