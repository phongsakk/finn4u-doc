package request

import "github.com/phongsakk/finn4u-back/utils"

type RefreshToken struct {
	RefreshToken string `json:"refresh_token" validate:"required"`
}

func (r *RefreshToken) Validated() error {
	return utils.Validate(r)
}
