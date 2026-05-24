package storage

import "io"

type Storage interface {
	Save(filename string, reader io.Reader) error
	Delete(filename string) error
	URL(path string) string
	Key(path string) string
}
