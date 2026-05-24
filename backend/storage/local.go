package storage

import (
	"io"
	"os"
	"path/filepath"
	"strings"
)

type LocalStorage struct {
	dir string
}

func NewLocalStorage(dir string) *LocalStorage {
	return &LocalStorage{dir: dir}
}

func (s *LocalStorage) Save(filename string, reader io.Reader) error {
	if err := os.MkdirAll(s.dir, os.ModePerm); err != nil {
		return err
	}
	dst, err := os.Create(filepath.Join(s.dir, filename))
	if err != nil {
		return err
	}
	defer dst.Close()
	_, err = io.Copy(dst, reader)
	return err
}

func (s *LocalStorage) Delete(filename string) error {
	return os.Remove(filepath.Join(s.dir, filename))
}

func (s *LocalStorage) URL(path string) string {
	prefix := "/" + s.dir + "/"
	if strings.HasPrefix(path, prefix) {
		return path
	}
	return prefix + path
}

func (s *LocalStorage) Key(path string) string {
	prefix := "/" + s.dir + "/"
	return strings.TrimPrefix(path, prefix)
}
