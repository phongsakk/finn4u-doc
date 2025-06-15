package middleware

import "github.com/gin-contrib/cors"

var Cors = cors.New(cors.Config{
	AllowOrigins: []string{
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:8079",
		"http://203.159.93.236:8079",
		"http://localhost:9079",
		"http://203.159.93.236:9079",
		"http://localhost:8076",
		"http://203.159.93.236:8076",
		"http://localhost:9076",
		"http://203.159.93.236:9076",
		"https://finn4u.com",
		"https://www.finn4u.com",
		"https://thuntanjai.com",
		"https://www.thuntanjai.com",
		"https://admin.finn4u.com",
		"https://fin4u.co",
		"https://www.fin4u.co",
		"https://admin.fin4u.co",
		// "*",
	},
	// AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	// AllowHeaders:     []string{"Content-Type", "Authorization"},
	// AllowCredentials: true, // หากต้องการให้รองรับ cookies หรือ authentication
})
