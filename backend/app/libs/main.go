package libs

import "github.com/phongsakk/finn4u-back/types"

const (
	AUTH_STRICT types.AuthMode = "strict"
	AUTH_GUEST  types.AuthMode = "guest"
)

const (
	ASSET_ADDED uint = iota
	ASSET_APRAISALED
	ASSET_MATCHING
	ASSET_SUCCESS
	ASSET_CANCELED
)

const (
	USER_ADMIN     types.UserType = "admin"
	USER_GENERAL   types.UserType = "general"
	USER_CONSIGNOR types.UserType = "consignor"
	USER_INVESTOR  types.UserType = "investor"
)
