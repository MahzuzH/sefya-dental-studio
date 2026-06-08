package utils

import (
	"os"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var (
	secretOnce sync.Once
	secret     []byte
)

func GetSecret() []byte {
	secretOnce.Do(func() {
		s := os.Getenv("JWT_SECRET")
		if s == "" {
			panic("JWT_SECRET is not set — application will not start without a secure secret")
		}
		secret = []byte(s)
	})
	return secret
}

func GenerateToken(userID string, role string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(GetSecret())
}
