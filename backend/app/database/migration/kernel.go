package migration

import (
	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models"
)

func Migrate() error {
	db, err := database.Conn()
	defer database.Close(db)
	if err != nil {
		return err
	}

	if err := db.AutoMigrate(
		&models.UserRole{},
		&models.User{},
	); err != nil {
		return err
	}

	return nil
}
