package main
import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)
func main() {
	h, _ := bcrypt.GenerateFromPassword([]byte("sefya123"), 14)
	fmt.Print(string(h))
}
