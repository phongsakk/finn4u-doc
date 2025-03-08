package models

import (
	"time"

	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (AssetAuction) TableName() string {
	return "asset_auction"
}

type AssetAuction struct {
	template.Model
	AssetID  uint      `json:"asset_id" gorm:"not null"`
	FromDate time.Time `json:"from_date" gorm:"not null"`
	ToDate   time.Time `json:"to_date" gorm:"not null"`
	FromTime string    `json:"from_time" gorm:"not null"` // Store time as HH:MM:SS
	ToTime   string    `json:"to_time" gorm:"not null"`   // Store time as HH:MM:SS
	MaxTax   float32   `json:"max_tax" gorm:"not null"`
	Asset    *Asset    `json:"asset" gorm:"foreignKey:AssetID;constraint:OnDelete:CASCADE"`
}
