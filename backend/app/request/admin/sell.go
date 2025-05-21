package admin

import "github.com/phongsakk/finn4u-back/utils"

type AdminUpdateSellRequest struct {
	SellID int64 `json:"sell_id"`
}

func (r *AdminUpdateSellRequest) Validated() error {
	return utils.Validate(r)
}
