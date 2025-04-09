package utils

import (
	"crypto/tls"
	"os"

	"gopkg.in/gomail.v2"

	"log"
)

// var configMailer *gomail.Dialer

func connectMailer(host, username, password string) *gomail.Dialer {
	mailer := gomail.NewDialer(
		host,
		587,
		username,
		password,
	)
	mailer.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	return mailer
}

type Mailer struct{}

func (m *Mailer) Send(message *gomail.Message) {
	// message.SetHeader("From", "noreply@finn4u.com")
	message.SetHeader("From", "Finn4U <noreply@finn4u.com>")

	mailer := connectMailer(
		os.Getenv("MAILER_HOST"),
		os.Getenv("MAILER_USERNAME"),
		os.Getenv("MAILER_PASSWORD"),
	)
	if err := mailer.DialAndSend(message); err != nil {
		log.Panicln("[Mailer] ", err)
	}
}

func SendEmail(to string, subject string, body string) {
	m := Mailer{}
	message := gomail.NewMessage()
	message.SetHeader("To", to)
	message.SetHeader("Subject", subject)
	message.SetBody("text/html", body)
	m.Send(message)
}
