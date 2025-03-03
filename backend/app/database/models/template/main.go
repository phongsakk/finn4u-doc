package template

import (
	"time"

	"gorm.io/gorm"
)

var SecretKeyAccess = []byte("finn4u-secret-access")
var SecretKeyRefresh = []byte("finn4u-secret-refresh")

type NameMultiLanguage struct {
	Name   string `json:"name" gorm:"type:varchar(128);not null"`
	NameTh string `json:"name_th" gorm:"type:varchar(128)"`
	NameEn string `json:"name_en" gorm:"type:varchar(128)"`
	NameCn string `json:"name_cn" gorm:"type:varchar(128)"`
}

type Model struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

type User struct {
	UserRoleID     int64   `json:"user_role_id" gorm:"not null"`
	Email          string  `json:"email" gorm:"size:255;not null;unique;index"`
	Password       string  `json:"-" gorm:"size:255"`
	Provider       string  `json:"provider" gorm:"size:126;default:password" validate:"oneof:password facebook email"`
	ProviderToken  string  `json:"-" gorm:"size:255"`
	Verified       bool    `json:"verified" gorm:"default:false"`
	UserPrefixID   int     `gorm:"not null"`
	Firstname      string  `gorm:"type:varchar(255);not null"`
	Lastname       string  `gorm:"type:varchar(255);not null"`
	PhoneNumber    string  `gorm:"type:varchar(32);not null"`
	CareerID       uint    `gorm:"not null"`
	CareerDesc     string  `gorm:"type:varchar(255)"`
	IncomePerMonth float64 `gorm:"type:decimal(18,2)"`
	OnlineRange    string  `gorm:"type:varchar(255)"`
	AddressNumber  string  `gorm:"type:varchar(128)"`
	AddressStreet  string  `gorm:"type:varchar(128)"`
	ProvinceID     uint    `gorm:"not null"`
	DistrictID     uint    `gorm:"not null"`
	SubdistrictID  uint    `gorm:"not null"`
}
