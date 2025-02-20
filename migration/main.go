package main

import (
	"encoding/json"
	"fmt"
	"io"
	"migration/models"
	"migration/setting"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// if err := SeedProvince(); err != nil {
	// 	fmt.Println(err)
	// 	return
	// }
	// if err := SeedDistrict(); err != nil {
	// 	fmt.Println(err)
	// 	return
	// }
	return
}

func SeedDistrict() error {
	jsonFile, err := os.Open("./json/district.json")
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	byteValue, err := io.ReadAll(jsonFile)
	if err != nil {
		return err
	}
	var file FileDistrict
	json.Unmarshal(byteValue, &file)

	db, err := Conn()
	if err != nil {
		return err
	}
	defer Close(db)
	if err := db.Transaction(func(tx *gorm.DB) error {
		for _, district := range file.Data {
			var insert models.District = models.District{}
			insert.ID = uint(district.Id)
			insert.Name = district.NameTh
			insert.NameEn = district.NameEn
			insert.ProvinceID = uint(district.ProvinceId)
			if err := db.Create(&insert).Error; err != nil {
				return err
			}
		}
		return nil
	}); err != nil {
		return err
	}

	return nil
}

func SeedProvince() error {
	fmt.Println("Migrating")
	jsonFile, err := os.Open("./json/province.json")
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	byteValue, err := io.ReadAll(jsonFile)
	if err != nil {
		return err
	}
	var file FileProvince
	json.Unmarshal(byteValue, &file)

	db, err := Conn()
	if err != nil {
		return err
	}
	defer Close(db)
	for _, province := range file.Data {
		var insert models.Province = models.Province{}
		insert.Name = province.NameTh
		insert.NameTh = province.NameTh
		insert.NameEn = province.NameEn
		if err := db.Create(&insert).Error; err != nil {
			return err
		}
	}
	return nil
}

func Conn() (*gorm.DB, error) {
	setting, err := setting.Database()
	if err != nil {
		return nil, err
	}
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s TimeZone=Asia/Bangkok sslmode=disable",
		setting.Host, setting.User, setting.Pass, setting.Name, setting.Port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	return db, err
}

func Close(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}

type FileProvince struct {
	Data []JsonProvinces `json:"data"`
}
type JsonProvinces struct {
	Id          int     `json:"id"`
	NameTh      string  `json:"name_th"`
	NameEn      string  `json:"name_en"`
	GeographyId int     `json:"geography_id"`
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string  `json:"updated_at"`
	DeletedAt   *string `json:"deleted_at"`
}
type FileDistrict struct {
	Data []JsonDistricts `json:"data"`
}
type JsonDistricts struct {
	Id         int     `json:"id"`
	NameTh     string  `json:"name_th"`
	NameEn     string  `json:"name_en"`
	ProvinceId int     `json:"province_id"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
	DeletedAt  *string `json:"deleted_at"`
}
