package models

import (
	"time"

	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (Sell) TableName() string {
	return "sell"
}

type Sell struct {
	template.Model
	SellTypeID        uint         `json:"sell_type_id"`
	AssetTypeID       uint         `json:"asset_type_id"`
	Title             string       `json:"title"`
	ProjectName       string       `json:"project_name"`
	Address           string       `json:"address"`
	Street            string       `json:"street"`
	Soi               string       `json:"soi"`
	ProvinceID        uint         `json:"province_id"`
	DistrictID        uint         `json:"district_id"`
	SubDistrictID     uint         `json:"sub_district_id"`
	PostalCode        string       `json:"postal_code"`
	GoogleMapLocation string       `json:"google_map_location"`
	BedroomCount      int          `json:"bedroom_count"`
	BathroomCount     int          `json:"bathroom_count"`
	FloorLevel        int          `json:"floor_level"`
	SquareMeter       float64      `json:"square_meter"`
	Price             float64      `json:"price"`
	OwnerID           uint         `json:"owner_id"`
	Description       string       `json:"description" validate:"required"`
	IsDisabled        bool         `json:"is_disabled" gorm:"default:false"`
	AgencyRequired    bool         `json:"agency_required" gorm:"default:false"`
	IsPublished       bool         `json:"is_published" gorm:"default:false"`
	RecommendedAt     *time.Time   `json:"recommended_at"`
	SellType          *SellType    `json:"sell_type,omitempty" gorm:"foreignKey:SellTypeID;references:ID"`
	AssetType         *AssetType   `json:"asset_type,omitempty" gorm:"foreignKey:AssetTypeID;references:ID"`
	Province          *Province    `json:"province,omitempty" gorm:"foreignKey:ProvinceID;references:ID"`
	District          *District    `json:"district,omitempty" gorm:"foreignKey:DistrictID;references:ID"`
	SubDistrict       *SubDistrict `json:"sub_district,omitempty" gorm:"foreignKey:SubDistrictID;references:ID"`
	Owner             *User        `json:"owner,omitempty" gorm:"foreignKey:OwnerID;references:ID"`
	Images            *[]SellImage `json:"images,omitempty" gorm:"foreignKey:SellID;references:ID"`
	GenID             string       `json:"gen_id" gorm:"type:varchar(64);not null;uniquo"`
}
