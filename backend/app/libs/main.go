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
