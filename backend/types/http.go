package types

import "github.com/golang-jwt/jwt"

type Response struct {
	Status    bool        `json:"status" default:"false"`
	Message   *string     `json:"message"`
	Error     *string     `json:"error,omitempty"`
	Code      uint        `json:"code" default:"400"`
	Data      interface{} `json:"data,omitempty"`
	Page      *int        `json:"page,omitempty"`
	Limit     *int        `json:"limit,omitempty"`
	Total     *int        `json:"total,omitempty"`
	TotalPage *int64      `json:"total_page,omitempty"`
}

type Auth struct {
	// jwt.MapClaims
	jwt.StandardClaims
	UserId uint   `json:"user_id"`
	Email  string `json:"email"`
	Exp    int64  `json:"exp"`
	// "user_id": user.ID,
	// 	"email":   user.Email,
	// 	"exp":     time.Now().Add(time.Minute * 5).Unix(),
}

type AuthMode string

type AuthResponse struct {
	AccessToken      string `json:"access_token"`
	RefreshToken     string `json:"refresh_token"`
	ExpiresIn        int64  `json:"expires_in"`
	RefreshExpiresIn int64  `json:"refresh_expires_in"`
}
