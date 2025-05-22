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
		// &models.UserRole{},
		// &models.Province{},
		// &models.District{},
		// &models.SubDistrict{},
		// &models.User{},
		// &models.Consignor{},
		// &models.Investor{},
		// &models.Admin{},
		// &models.AssetType{},
		// &models.Asset{},
		// &models.OTP{},
		// &models.AssetAppraisal{},
		// &models.AssetAppraisalImage{},
		// &models.AssetImage{},
		// &models.AssetAuction{},
		// &models.Tag{},
		// &models.AssetTag{},
		// &models.UserPrefix{},
		// &models.AssetBidOffer{},
		// &models.AssetInvestmentOffer{},
		// &models.Matching{},
		&models.Sell{},
		&models.SellType{},
		&models.SellImage{},
	); err != nil {
		return err
	}

	return nil
}
