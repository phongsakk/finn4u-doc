package models

import "time"

func (District) TableName() string {
	return "district"
}

type District struct {
	ID         int        `json:"id" gorm:"primaryKey;autoIncrement"`
	ProvinceID int        `json:"province_id" gorm:"not null"`
	Name       string     `json:"name" gorm:"size:128;not null"`
	NameTH     string     `json:"name_th" gorm:"size:128"`
	NameEN     string     `json:"name_en" gorm:"size:128"`
	NameCN     string     `json:"name_cn" gorm:"size:128"`
	CreatedAt  time.Time  `json:"created_at" gorm:"not null;default:CURRENT_TIMESTAMP"`
	UpdatedAt  time.Time  `json:"updated_at" gorm:"not null"`
	DeletedAt  *time.Time `json:"deleted_at" gorm:"index"`
}
