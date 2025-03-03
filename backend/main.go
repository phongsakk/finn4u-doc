package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/phongsakk/finn4u-back/app/bootstrap"
	con "github.com/phongsakk/finn4u-back/app/controller"
	mid "github.com/phongsakk/finn4u-back/app/middleware"
	"github.com/phongsakk/finn4u-back/route"
)

func main() {
	if err := bootstrap.Boot(); err != nil {
		log.Fatal(err)
		return
	}
	r := gin.Default()

	r.Use(mid.Logger)
	r.Use(mid.Cors)

	r.GET("/", con.HealthCheck)
	route.V1(r.Group("/v1"))

	r.Run(":8080")
}
