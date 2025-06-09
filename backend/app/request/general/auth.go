package general

import "github.com/phongsakk/finn4u-back/utils"

type RegisterGeneralUserRequest struct {
	// 	firstname
	// lastname
	// email
	// password
	// confirm_password

	Email               string  `json:"email" validate:"required,email"`
	Password            string  `json:"password" validate:"required,min=8"`
	ConfirmPassword     string  `json:"confirm_password" validate:"required"`
	UserPrefixId        int64   `json:"user_prefix_id" validate:"required"`
	Fisrtname           string  `json:"firstname" validate:"required"`
	Lastname            string  `json:"lastname" validate:"required"`
	PhoneNumber         string  `json:"phone_number" validate:"max=32"`
	OnlineRange         string  `json:"online_range"`
	CareerId            int64   `json:"career_id"`
	CareerDesc          string  `json:"career_desc"`
	IncomePerMonth      float32 `json:"income_per_month"`
	AddressNumber       string  `json:"address_number"`
	AddressStreet       string  `json:"address_street"`
	ProvinceID          uint    `json:"province_id"`
	DistrictID          uint    `json:"district_id"`
	SubdistrictID       uint    `json:"subdistrict_id"`
	Beneficiary         string  `json:"beneficiary"`
	Relation            string  `json:"relation"`
	InvesmentDistrictId int     `json:"investment_district_id"`
	AssetTypeId         int     `json:"asset_type_id"`
	InvestmentAmount    float64 `json:"investment_amount"`
}

func (r *RegisterGeneralUserRequest) Validated() error {
	return utils.Validate(r)
}

type Login struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (r *Login) Validated() error {
	return utils.Validate(r)
}

type RefreshToken struct {
	RefreshToken string `json:"refresh_token" validate:"required"`
}

func (r *RefreshToken) Validated() error {
	return utils.Validate(r)
}

type ResendOTPRequest struct {
	Email string `json:"email" validate:"required,email"`
}

func (r *ResendOTPRequest) Validated() error {
	return utils.Validate(r)
}

type VerifyOTPRequest struct {
	Email string `json:"email" validate:"required,email"`
	Code  string `json:"code" validate:"required"`
}

func (r *VerifyOTPRequest) Validated() error {
	return utils.Validate(r)
}
