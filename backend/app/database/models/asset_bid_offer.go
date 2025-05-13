package models

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/phongsakk/finn4u-back/app/database"
	"github.com/phongsakk/finn4u-back/app/database/models/template"
)

func (AssetBidOffer) TableName() string {
	return "asset_bid_offer"
}

type AssetBidOffer struct {
	template.Model
	AssetID  uint       `json:"asset_id" gorm:"not null;index:idx_asset_id"`
	BidderID uint       `json:"bidder_id" gorm:"not null;index:idx_bidder_id"`
	Offer    float64    `json:"offer" gorm:"not null"`
	Time     int8       `json:"time" gorm:"not null,default:1"`
	IsWinner bool       `json:"is_winner" gorm:"default:false"`
	Status   uint8      `json:"status" gorm:"default:0"`
	Bidder   *Consignor `json:"bidder,omitempty" gorm:"foreignKey:BidderID"`
}

func (bid *AssetBidOffer) CreateBidOffer(user *Consignor, assetID uint, offer float64) error {
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

	// count bid history of asset
	var count, maxBid int64 = 0, 3
	db.Model(&AssetBidOffer{}).Where("asset_id = ? AND bidder_id = ?", assetID, user.ID).Count(&count)
	if count >= maxBid {
		return errors.New("maximum bid limit reached")
	}

	bid.AssetID = assetID
	bid.Offer = offer
	bid.Time = int8(1 + count)
	bid.BidderID = user.ID

	asset.BidCount = asset.BidCount + 1
	db.Save(&asset)

	return db.Create(&bid).Error
}
