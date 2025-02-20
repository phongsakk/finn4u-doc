package models

import (
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (Profile) TableName() string {
	return "profile"
}

type Profile struct {
	template.Model
	UserID         int     `gorm:"unique;not null"`
	UserPrefixID   int     `gorm:"not null"`
	Firstname      string  `gorm:"type:varchar(255);not null"`
	Lastname       string  `gorm:"type:varchar(255);not null"`
	PhoneNumber    string  `gorm:"type:varchar(32);not null"`
	CareerID       int     `gorm:"not null"`
	CareerDesc     string  `gorm:"type:varchar(255)"`
	IncomePerMonth float64 `gorm:"type:decimal(18,2)"`
	OnlineRange    string  `gorm:"type:varchar(255)"`
	AddressNumber  string  `gorm:"type:varchar(128)"`
	AddressStreet  string  `gorm:"type:varchar(128)"`
	ProvinceID     int     `gorm:"not null"`
	DistrictID     int     `gorm:"not null"`
	SubdistrictID  int     `gorm:"not null"`
	User           User    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:UserID"`
}
