package models

import (
	"time"

	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

type OTP struct {
	template.Model
	UserID    uint      `json:"user_id" gorm:"not null"`
	Ref       string    `json:"ref" gorm:"not null;unique"`
	UserType  string    `json:"user_type"`
	Code      string    `json:"code" gorm:"not null"`
	ExpiredAt time.Time `json:"expired_at" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"default: CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"updated_at" gorm:"default: CURRENT_TIMESTAMP"`
}

func (OTP) TableName() string {
	return "otp"
}
