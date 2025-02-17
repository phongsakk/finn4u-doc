package models

import "time"

func (AssetType) TableName() string {
	return "asset_type"
}

type AssetType struct {
	ID        int        `json:"id,omitempty" gorm:"primaryKey;autoIncrement"`
	Name      string     `json:"name" gorm:"type:varchar(128);not null"`
	NameTh    string     `json:"name_th" gorm:"type:varchar(128)"`
	NameEn    string     `json:"name_en" gorm:"type:varchar(128)"`
	NameCn    string     `json:"name_cn" gorm:"type:varchar(128)"`
	CreatedAt time.Time  `json:"created_at" gorm:"not null;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time  `json:"updated_at" gorm:"not null"`
	DeletedAt *time.Time `json:"deleted_at" gorm:"index"`
}
