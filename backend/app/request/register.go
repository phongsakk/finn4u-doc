package request

import "github.com/phongsakk/finn4u-back/utils"

type Register struct {
	Email               string  `json:"email" validate:"required,email"`
	Password            string  `json:"password" validate:"required,min:8"`
	ConfirmPassword     string  `json:"confirm_password" validate:"required"`
	UserPrefixId        int64   `json:"user_prefix_id" validate:"required"`
	Fisrtname           string  `json:"firstname" validate:"required"`
	Lastname            string  `json:"lastname" validate:"required"`
	PhoneNumber         string  `json:"phone_number" validate:"required,max:32"`
	OnlineRange         string  `json:"online_range" validate:"required"`
	CareerId            int64   `json:"career_id" validate:"required"`
	CareerDesc          string  `json:"career_desc" validate:"default:default"`
	IncomePerMonth      float32 `json:"income_per_month" validate:"omitempty"`
	AddressNumber       string  `json:"address_number" validate:"omitempty"`
	AddressStreet       string  `json:"address_street" validate:"omitempty"`
	ProvinceId          int64   `json:"province_id" validate:"omitempty"`
	DistrictId          int64   `json:"district_id" validate:"omitempty"`
	SubdistrictId       int64   `json:"subdistrict_id" validate:"omitempty"`
	Beneficiary         string  `json:"beneficiary" validate:"required"`
	Relation            string  `json:"relation" validate:"required"`
	InvesmentDistrictId int     `json:"investment_district_id" validate:"required"`
	AssetTypeId         int     `json:"asset_type_id" validate:"required"`
	InvestmentAmount    float64 `json:"investment_amount" validate:"required"`
}

func (r *Register) Validated() error {
	return utils.Validate(r)
}

type Signup struct {
	Email           string  `json:"email" validate:"required,email"`
	Password        string  `json:"password" validate:"required,min=8"`
	ConfirmPassword string  `json:"confirm_password" validate:"required"`
	UserPrefixId    int64   `json:"user_prefix_id" validate:"required"`
	Fisrtname       string  `json:"firstname" validate:"required"`
	Lastname        string  `json:"lastname" validate:"required"`
	PhoneNumber     string  `json:"phone_number" validate:"required,max=32"`
	OnlineRange     string  `json:"online_range" validate:"required"`
	CareerId        uint    `json:"career_id" validate:"required"`
	CareerDesc      string  `json:"career_desc" validate:"omitempty"`
	IncomePerMonth  float64 `json:"income_per_month" validate:"omitempty"`
	AddressNumber   string  `json:"address_number" validate:"omitempty"`
	AddressStreet   string  `json:"address_street" validate:"omitempty"`
	ProvinceId      uint    `json:"province_id" validate:"omitempty"`
	DistrictId      uint    `json:"district_id" validate:"omitempty"`
	SubdistrictId   uint    `json:"subdistrict_id" validate:"omitempty"`
}

func (r *Signup) Validated() error {
	return utils.Validate(r)
}
