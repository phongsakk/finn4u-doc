package general

import "github.com/phongsakk/finn4u-back/utils"

type BidOfferRequest struct {
	AssetID int     `json:"asset_id" validate:"required,min=1,max=2000000000000000000"`
	Offer   float64 `json:"offer" validate:"required,gt=0,min=1,max=9223372036854775807"`
}

func (r *BidOfferRequest) Validated() error {
	return utils.Validate(r)
}
