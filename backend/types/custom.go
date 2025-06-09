package types

type PlaceMostInterested struct {
	Province   string `json:"province"`
	District   string `json:"district"`
	Price      int64  `json:"price"`
	Collateral int64  `json:"collateral"`
}
