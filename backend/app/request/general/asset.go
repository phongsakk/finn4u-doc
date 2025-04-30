package general

import "github.com/phongsakk/finn4u-back/utils"

type FindAssetRequest struct {
	AssetTypeID int64  `json:"asset_type_id"`
	Keyword     string `json:"keyword"`
	Page        int    `json:"page"`
	Take        int    `json:"take"`
}

func (r FindAssetRequest) Validated() error {
	return utils.Validate(r)
}
