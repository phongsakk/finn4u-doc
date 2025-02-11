package setting

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type IDatabase struct {
	Host string
	Port string
	User string
	Pass string
	Name string
}

func Database() (*IDatabase, error) {
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")
	if dbHost == "" || dbUser == "" || dbPassword == "" || dbName == "" || dbPort == "" {
		log.Fatal("Missing database configuration")
	}
	return &IDatabase{
		Host: dbHost,
		Port: dbPort,
		User: dbUser,
		Pass: dbPassword,
		Name: dbName,
	}, nil
}
