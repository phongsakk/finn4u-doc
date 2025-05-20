package general

import "github.com/phongsakk/finn4u-back/utils"

type CreateSellRequest struct {
	SellTypeID        uint    `json:"sell_type_id" validate:"required"`
	AssetTypeID       uint    `json:"asset_type_id" validate:"required"`
	Title             string  `json:"title" validate:"required"`
	ProjectName       string  `json:"project_name" validate:"required"`
	Address           string  `json:"address" validate:"required"`
	Street            string  `json:"street"`
	Soi               string  `json:"soi"`
	ProvinceID        int     `json:"province_id"`
	DistrictID        int     `json:"district_id"`
	SubDistrictID     int     `json:"sub_district_id"`
	PostalCode        string  `json:"postal_code" validate:"required"`
	GoogleMapLocation string  `json:"google_map_location" validate:"required"`
	BedroomCount      int     `json:"bedroom_count" validate:"required"`
	BathroomCount     int     `json:"bathroom_count" validate:"required"`
	FloorLevel        int     `json:"floor_level" validate:"required"`
	SquareMeter       float64 `json:"square_meter" validate:"required"`
	Price             float64 `json:"price" validate:"required"`
	Description       string  `json:"description" validate:"required"`
}

func (r *CreateSellRequest) Validated() error {
	return utils.Validate(r)
}
