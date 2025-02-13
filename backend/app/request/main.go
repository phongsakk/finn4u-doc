package request

type Register struct {
	Email           string  `json:"email" validate:"required,email"`
	Password        string  `json:"password" validate:"required,min:8"`
	ConfirmPassword string  `json:"confirm_password" validate:"required"`
	UserPrefixId    int64   `json:"user_prefix_id" validate:"required"`
	Fisrtname       string  `json:"firstname" validate:"required"`
	Lastname        string  `json:"lastname" validate:"required"`
	PhoneNumber     string  `json:"phone_number" validate:"required,max:32"`
	OnlineRange     string  `json:"online_range" validate:"required"`
	CareerId        int64   `json:"career_id" validate:"required"`
	CareerDesc      string  `json:"career_desc" validate:"default:default"`
	IncomePerMonth  float32 `json:"income_per_month" validate:"omitempty"`
	AddressNumber   string  `json:"address_number" validate:"omitempty"`
	AddressStreet   string  `json:"address_street" validate:"omitempty"`
	ProvinceId      int64   `json:"province_id" validate:"omitempty"`
	DistrictId      int64   `json:"district_id" validate:"omitempty"`
	SubdistrictId   int64   `json:"subdistrict_id" validate:"omitempty"`
}
