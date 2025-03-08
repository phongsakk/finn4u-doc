package utils

import (
	"strconv"
	"strings"
)

func NullableString(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}

func JoinIntSlice(array *[]uint, sep string) string {
	if len(*array) == 0 {
		return ""
	}
	var result []string
	for _, item := range *array {
		result = append(result, strconv.Itoa(int(item)))
	}
	return strings.Join(result, sep)
}
