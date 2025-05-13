package models

import "github.com/phongsakk/finn4u-back/app/database/models/template"

type Matching struct {
	template.Model
	ConfirmByAdminID          uint   `json:"confirm_by_admin_id" gorm:"not null"`
	AssetID                   uint   `json:"asset_id" gorm:"not null;index;unique"`
	BidderID                  uint   `json:"bidder_id" gorm:"not null"`
	AssetBidOfferID           uint   `json:"asset_bid_offer_id" gorm:"not null;index;unique"`
	ContractFile              string `json:"contract_file"`
	SpouseConsentFile         string `json:"spouse_consent_file"`
	AgentAppointmentAgreement string `json:"agent_appointment_agreement"`
	PurchaseAndSaleAgreement  string `json:"purchase_and_sale_agreement"`
	PropertyDetailsForm       string `json:"property_details_form"`
	PowerOfAttorney           string `json:"power_of_attorney"`
	CondoPowerOfAttorney      string `json:"condo_power_of_attorney"`
}
