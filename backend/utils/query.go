package utils

func Offset(page int, take int) int {
	return (page - 1) * take
}
