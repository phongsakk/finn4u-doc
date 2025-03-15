package request

import (
	"time"

	"github.com/phongsakk/finn4u-back/utils"
)

type CreateAssetRequest struct {
	ProvinceID          uint       `json:"province_id" validate:"required"`
	DistrictID          *uint      `json:"district_id" validate:"omitempty"`
	AssetTypeID         uint       `json:"asset_type_id" validate:"required"`
	AriaSizeRai         uint       `json:"aria_size_rai" validate:"omitempty"`
	AriaSizeNgan        uint       `json:"aria_size_ngan" validate:"omitempty"`
	AriaSizeSquareWa    float64    `json:"aria_size_square_wa" validate:"omitempty"`
	AriaSizeSquareMetre float64    `json:"aria_size_square_metre" validate:"omitempty"`
	Collateral          *int       `json:"collateral" validate:"omitempty"`
	ConsignmentPrice    *int       `json:"consignment_price" validate:"omitempty"`     // ราคาขายฝาก
	LandTitleDeedNumber string     `json:"land_title_deed_number" validate:"required"` // เลขโฉนด
	LandTitleDeedImage  string     `json:"land_title_deed_image" validate:"required"`
	LandPlotNumber      string     `json:"land_plot_number" validate:"required"` // เลขระวาง
	Location            *string    `json:"location" validate:"omitempty"`
	LocationX           *string    `json:"location_x" validate:"omitempty"`
	LocationY           *string    `json:"location_y" validate:"omitempty"`
	IsMultipleHolder    bool       `json:"is_multiple_holder" validate:"omitempty"`
	EndedAt             *time.Time `json:"ended_at" validate:"omitempty"`
	Description         *string    `json:"description" validate:"omitempty"` // รายละเอียดของทรัพยากร
	AssetImages         []string   `json:"asset_images"`
}

func (r *CreateAssetRequest) Validated() error {
	return utils.Validate(r)
}
