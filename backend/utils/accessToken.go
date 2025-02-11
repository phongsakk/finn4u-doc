package utils

import "github.com/phongsakk/finn4u-back/app/database/models"

func GenerateAccessToken(user models.User) string {
	// jwt from user
	return ""
}

func GenerateRefreshToken(user models.User) string {
	// jwt from user
	return ""
}

func GenerateAccessExpiresIn() int {
	// 5 minutes
	return 60 * 5
}

func GenerateRefreshExpiresIn() int {
	// 1 day
	return 60 * 60 * 24
}
