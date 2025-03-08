package admin

import (
	"time"

	"github.com/phongsakk/finn4u-back/utils"
)

type DoAppraisal struct {
	PriceAppraisal float64   `json:"price_appraisal" validate:"required"`
	CollateraPrice float64   `json:"collateral_price" validate:"required"`
	Duration       int       `json:"duration" validate:"required"`
	DisplayImages  *[]uint   `json:"display_images" validate:"omitempty"`
	NewImages      *[]string `json:"new_images" validate:"omitempty"`
	Tags           *[]uint   `json:"tags" validate:"omitempty"`
	IsPublished    *bool     `json:"is_published" validate:"omitempty"`
	Status         *uint     `json:"status" validate:"omitempty"`
	Auction        *Auction  `json:"auction" validate:"omitempty"`
}

type Auction struct {
	FromDate time.Time `json:"from_date" validate:"required"`
	ToDate   time.Time `json:"to_date" validate:"required"`
	FromTime string    `json:"from_time" validate:"required"`
	ToTime   string    `json:"to_time" validate:"required"`
	MaxTax   float32   `json:"max_tax" validate:"required"`
}

func (r *DoAppraisal) Validated() error {
	return utils.Validate(r)
}
