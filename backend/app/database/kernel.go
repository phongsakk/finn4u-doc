package database

import (
	"fmt"

	"github.com/phongsakk/finn4u-back/app/setting"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

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
