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
	fmt.Println("Migrating")
	jsonFile, err := os.Open("./json/province.json")
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	byteValue, err := io.ReadAll(jsonFile)
	if err != nil {
		fmt.Println(err)
	}
	var file FileProvince
	json.Unmarshal(byteValue, &file)

	db, err := Conn()
	if err != nil {
		fmt.Println(err)
		return
	}
	defer Close(db)
	for _, province := range file.Data {
		var insert models.Province = models.Province{}
		insert.Name = province.NameTh
		insert.NameTh = province.NameTh
		insert.NameEn = province.NameEn
		db.Create(&insert)
	}
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
