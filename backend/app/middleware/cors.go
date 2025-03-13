package middleware

import "github.com/gin-contrib/cors"

var Cors = cors.New(cors.Config{
	AllowOrigins: []string{
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:8079",
		"http://203.159.93.236:8079",
		"http://localhost:8076",
		"http://203.159.93.236:8076",
		// "*",
	},
	// AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	// AllowHeaders:     []string{"Content-Type", "Authorization"},
	// AllowCredentials: true, // หากต้องการให้รองรับ cookies หรือ authentication
})
