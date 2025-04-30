package consignor

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phongsakk/finn4u-back/app/database/models"
	generalRequest "github.com/phongsakk/finn4u-back/app/request/general"
	"github.com/phongsakk/finn4u-back/types"
	"github.com/phongsakk/finn4u-back/utils"
)

func CreateBid(c *gin.Context) {
	fmt.Println("create bid")
	var bid models.AssetBidOffer
	var user models.Consignor
	var r generalRequest.BidOfferRequest
	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	if err := r.Validated(); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:  http.StatusBadRequest,
			Error: utils.NullableString(err.Error()),
		})
		return
	}
	if err := user.GetFromRequest(c); err != nil {
		c.JSON(http.StatusUnauthorized, types.Response{
			Code:    http.StatusUnauthorized,
			Message: utils.NullableString("User not authorized"),
			Error:   utils.NullableString("User not authorized"),
		})
		return
	}

	// Create the bid offer in the database
	if err := bid.CreateBidOffer(&user, r.AssetID, r.Offer); err != nil {
		c.JSON(http.StatusBadRequest, types.Response{
			Code:    http.StatusBadRequest,
			Message: utils.NullableString(err.Error()),
			Error:   utils.NullableString(err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, types.Response{
		Code:    http.StatusOK,
		Status:  true,
		Message: utils.NullableString("Bid offer created successfully"),
		Data:    &bid,
	})
}
