package utils

import "math/rand"

func RandomString(length int) string {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var result []byte
	for range length {
		letterLen := len(letters)
		indx := rand.Intn(letterLen)
		randx := letters[indx]
		result = append(result, randx)
	}
	return string(result)
}

func RandomNumber(length int) string {
	const numbers = "0123456789"
	var result []byte
	for range length {
		letterLen := len(numbers)
		indx := rand.Intn(letterLen)
		randx := numbers[indx]
		result = append(result, randx)
	}
	return string(result)
}
