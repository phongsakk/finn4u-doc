package middleware

import "github.com/gin-contrib/cors"

var Cors = cors.New(cors.Config{
	AllowOrigins: []string{"http://localhost:3000", "http://localhost:8079", "http://103.22.183.137:8079"},
})
