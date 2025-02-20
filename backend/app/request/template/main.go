package template

type Paging struct {
	Page    int    `json:"page"`
	Take    int    `json:"take"`
	OrderBy string `json:"order_by"`
	Sort    string `json:"sort"`
}
