package admin

import (
	"time"

	"github.com/phongsakk/finn4u-back/utils"
)

type DoAppraisal struct {
	PriceAppraisal float64   `json:"price_appraisal" validate:"required"`
	CollateraPrice string    `json:"collateral_price" validate:"required"`
	Duration       int       `json:"duration" validate:"required"`
	Images         *[]string `json:"images" validate:"omitempty"`
	Tags           *[]uint   `json:"tags" validate:"omitempty"`
	Auction        *Auction  `json:"auction" validate:"omitempty"`
}

type Auction struct {
	FromDate time.Time `json:"from_date" validate:"required"`
	ToDate   time.Time `json:"to_date" validate:"required"`
	FromTime string    `json:"from_time" validate:"type:time;not null"`
	ToTime   string    `json:"to_time" validate:"type:time;not null"`
	MaxTax   float32   `json:"max_tax" validate:"not null"`
}

func (r *DoAppraisal) Validated() error {
	return utils.Validate(r)
}
