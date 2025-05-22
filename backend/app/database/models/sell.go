package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

func (Sell) TableName() string {
	return "sell"
}

type Sell struct {
	template.Model
	SellTypeID        uint    `json:"sell_type_id"`
	AssetTypeID       uint    `json:"asset_type_id"`
	Title             string  `json:"title"`
	ProjectName       string  `json:"project_name"`
	Address           string  `json:"address"`
	Street            string  `json:"street"`
	Soi               string  `json:"soi"`
	ProvinceID        int     `json:"province_id"`
	DistrictID        int     `json:"district_id"`
	SubDistrictID     int     `json:"sub_district_id"`
	PostalCode        string  `json:"postal_code"`
	GoogleMapLocation string  `json:"google_map_location"`
	BedroomCount      int     `json:"bedroom_count"`
	BathroomCount     int     `json:"bathroom_count"`
	FloorLevel        int     `json:"floor_level"`
	SquareMeter       float64 `json:"square_meter"`
	Price             float64 `json:"price"`
	OwnerID           uint    `json:"owner_id"`
	Description       string  `json:"description" validate:"required"`
	IsDisabled        bool    `json:"is_disabled" gorm:"default:false"`
}
