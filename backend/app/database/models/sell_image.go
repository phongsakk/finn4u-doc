package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type SellImage struct {
	template.Model
	Image  string `json:"image" gorm:"not null"`
	SellID uint   `json:"sell_id" gorm:"not null"`
	Sell   *Sell  `json:"sell,omitempty" gorm:"foreignKey:SellID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
