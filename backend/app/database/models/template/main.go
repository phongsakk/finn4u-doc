package template

type NameMultiLanguage struct {
	Name   string `json:"name" gorm:"type:varchar(128);not null"`
	NameTh string `json:"name_th" gorm:"type:varchar(128)"`
	NameEn string `json:"name_en" gorm:"type:varchar(128)"`
	NameCn string `json:"name_cn" gorm:"type:varchar(128)"`
}
