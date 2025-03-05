package models

import (
	"time"

	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (Asset) TableName() string {
	return "asset"
}

type Asset struct {
	template.Model
	GenID               string        `json:"gen_id" gorm:"type:varchar(64);not null,unique"`
	ProvinceID          uint          `json:"province_id" gorm:"not null"`
	DistrictID          uint          `json:"district_id" gorm:"not null"`
	AssetTypeID         uint          `json:"asset_type_id" gorm:"not null"`
	OwnerID             uint          `json:"owner_id" gorm:"not null"`
	AriaSizeRai         uint          `json:"aria_size_rai" gorm:"not null"`
	AriaSizeNgan        uint          `json:"aria_size_ngan" gorm:"not null"`
	AriaSizeSquareWa    float64       `json:"aria_size_square_wa" gorm:"type:decimal(18,2);not null"`
	Collateral          int           `json:"collateral"`
	ConsignmentPrice    int           `json:"consignment_price"`
	LandTitleDeedNumber string        `json:"land_title_deed_number" gorm:"type:varchar(128);not null"`
	LandTitleDeedImage  string        `json:"land_title_deed_image" gorm:"type:text;not null"`
	LandPlotNumber      string        `json:"land_plot_number" gorm:"type:varchar(128);not null"`
	Location            *string       `json:"location" gorm:"type:varchar(128)"`
	LocationX           *string       `json:"location_x" gorm:"type:varchar(128)"`
	LocationY           *string       `json:"location_y" gorm:"type:varchar(128)"`
	IsMultipleHolder    bool          `json:"is_multiple_holder" gorm:"default:false"`
	Description         *string       `json:"description" gorm:"type:text"`
	PublishedAt         *time.Time    `json:"published_at"`
	EndedAt             *time.Time    `json:"ended_at"`
	Status              int           `json:"status"`
	IsPublished         bool          `json:"is_published"`
	Province            *Province     `json:"province,omitempty" gorm:"foreignKey:ProvinceID;references:ID"`
	District            *District     `json:"district,omitempty" gorm:"foreignKey:DistrictID;references:ID"`
	AssetType           *AssetType    `json:"asset_type,omitempty" gorm:"foreignKey:AssetTypeID;references:ID"`
	Owner               *User         `json:"owner,omitempty" gorm:"foreignKey:OwnerID;references:ID"`
	AssetImages         *[]AssetImage `json:"asset_images,omitempty" gorm:"foreignKey:AssetID;references:ID"`
}
