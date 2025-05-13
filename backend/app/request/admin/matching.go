package admin

import "github.com/phongsakk/finn4u-back/utils"

type CreateMatchingRequest struct {
	AssetID         uint `json:"asset_id" validate:"required"`
	BidderID        uint `json:"bidder_id" validate:"required"`
	AssetBidOfferID uint `json:"asset_bid_offer_id" validate:"required"`
}

func (r *CreateMatchingRequest) Validate() error {
	return utils.Validate(r)
}
