package models

type Disease struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Treatment   string `json:"treatment"`
	ColorCode   string `json:"color_code"`
}
