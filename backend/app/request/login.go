package request

import "github.com/phongsakk/finn4u-back/utils"

type Login struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (r *Login) Validated() error {
	return utils.Validate(r)
}

type Connect struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (c *Connect) Validated() error {
	return utils.Validate(c)
}
