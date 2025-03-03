package request

import (
	"time"

	"github.com/phongsakk/finn4u-back/utils"
)

type CreateAssetRequest struct {
	ProvinceID          uint       `json:"province_id" validate:"required"`
	DistrictID          uint       `json:"district_id" validate:"required"`
	AssetTypeID         uint       `json:"asset_type_id" validate:"required"`
	AriaSizeRai         uint       `json:"aria_size_rai" validate:"omitempty"`
	AriaSizeNgan        uint       `json:"aria_size_ngan" validate:"omitempty"`
	AriaSizeSquareWa    float64    `json:"aria_size_square_wa" validate:"omitempty"`
	Collateral          int        `json:"collateral" validate:"required"`
	ConsignmentPrice    int        `json:"consignment_price" validate:"required"`
	LandTitleDeedNumber string     `json:"land_title_deed_number" validate:"required"`
	LandPlotNumber      string     `json:"land_plot_number" validate:"required"`
	LocationX           *string    `json:"location_x" validate:"omitempty"`
	LocationY           *string    `json:"location_y" validate:"omitempty"`
	IsMultipleHolder    bool       `json:"is_multiple_holder" validate:"omitempty"`
	EndedAt             *time.Time `json:"ended_at" validate:"omitempty"`
}

func (r *CreateAssetRequest) Validated() error {
	return utils.Validate(r)
}
