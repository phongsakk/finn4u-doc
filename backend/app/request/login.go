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

type ConsignorResendOTP struct {
	Email string `json:"email" validate:"required,email"`
}

type ConsignorVerifyOTP struct {
	Email string `json:"email" validate:"required,email"`
	Code  string `json:"code" validate:"required"`
}

type InvestorVerifyOTP struct {
	Email string `json:"email" validate:"required,email"`
	Code  string `json:"code" validate:"required"`
}

func (r *ConsignorResendOTP) Validated() error {
	return utils.Validate(r)
}

func (r *InvestorVerifyOTP) Validated() error {
	return utils.Validate(r)
}

func (r *ConsignorVerifyOTP) Validated() error {
	return utils.Validate(r)
}

func (c *Connect) Validated() error {
	return utils.Validate(c)
}

type SignIn struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (c *SignIn) Validated() error {
	return utils.Validate(c)
}
