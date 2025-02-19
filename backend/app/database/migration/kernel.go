package migration

import (
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
)

func Migrate() error {
	db, err := database.Conn()
	if err != nil {
		return err
	}
	defer database.Close(db)

	if err := db.AutoMigrate(
		&models.UserRole{},
		&models.Province{},
		&models.District{},
		&models.User{},
		&models.Profile{},
		&models.AssetType{},
		&models.Asset{},
	); err != nil {
		return err
	}

	return nil
}
