package models

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models/template"
	"gorm.io/gorm"
)

func (AssetInvestmentOffer) TableName() string {
	return "asset_investment_offer"
}

type AssetInvestmentOffer struct {
	template.Model
	AssetID    uint      `json:"asset_id" gorm:"not null;index:idx_asset_id"`
	InvestorID uint      `json:"investor_id" gorm:"not null;index:idx_investor_id"`
	Offer      float64   `json:"offer" gorm:"not null"`
	IsWinner   bool      `json:"is_winner" gorm:"default:false"`
	Status     uint8     `json:"status" gorm:"default:0"`
	Investor   Consignor `json:"investor" gorm:"foreignKey:InvestorID"`
}

func (invest *AssetInvestmentOffer) CreateInvestmentOffer(user *Consignor, assetID uint, offer float64) error {
	var errored error
	db, dbError := database.Conn()

	if dbError != nil {
		return errors.Join(errored, dbError)
	}
	defer database.Close(db)

	var asset Asset
	var errorGroup error
	if err := db.Preload("AssetAuction").Order("created_at DESC").First(&asset, "id = ?", assetID).Error; err != nil {
		errors.Join(errorGroup, err)
	}

	// check if aiction exists
	if asset.AssetAuction == nil {
		return errors.Join(errorGroup, errors.New("asset not found or auction does not exist"))
	}

	Auction := asset.AssetAuction
	SlitedFrom := strings.Split(Auction.FromTime, ":")
	FromHours, FromHoursError := strconv.Atoi(SlitedFrom[0])
	FromMinutes, FromMinutesError := strconv.Atoi(SlitedFrom[1])
	if FromHoursError != nil || FromMinutesError != nil {
		return errors.New("invalid from_time format")
	}
	StartDate := Auction.FromDate.Add(time.Hour*time.Duration(FromHours) + time.Minute*time.Duration(FromMinutes))
	fmt.Println(StartDate)
	if StartDate.Unix() > time.Now().Unix() {
		return errors.New("auction has not started yet")
	}
	SlitedTo := strings.Split(Auction.ToTime, ":")
	ToHours, ToHoursError := strconv.Atoi(SlitedTo[0])
	ToMinutes, ToMinutesError := strconv.Atoi(SlitedTo[1])
	if ToHoursError != nil || ToMinutesError != nil {
		return errors.New("invalid from_time format")
	}
	ToDate := Auction.ToDate.Add(time.Hour*time.Duration(ToHours) + time.Minute*time.Duration(ToMinutes))
	fmt.Println(ToDate)
	if ToDate.Unix() < time.Now().Unix() {
		return errors.New("auction has ended")
	}

	// count investment history of asset
	// var count, maxInvestment int64 = 0, 1
	var investment AssetInvestmentOffer
	if err := db.Model(&AssetInvestmentOffer{}).Where("asset_id = ? AND investor_id = ?", assetID, user.ID).First(&investment).Error; err == gorm.ErrRecordNotFound {
		// update investment history if exists
		investment.Offer = offer
		return db.Save(&investment).Error
	} else {
		// create new
		invest.AssetID = assetID
		invest.Offer = offer
		invest.InvestorID = user.ID
		return db.Create(&invest).Error
	}
}
