#!/usr/bin/env bash
set -e

APP_DIR="$HOME/sefya-dental"
BACKEND_BIN="/opt/sefya/sefya-api"
FRONTEND_DEST="/opt/sefya/frontend"

echo "==> Pulling latest code..."
cd "$APP_DIR"
git pull origin main

echo "==> Building backend..."
cd "$APP_DIR/backend"
go mod tidy
go build -o "$BACKEND_BIN" .

echo "==> Copying schema (if changed)..."
cp -u "$APP_DIR/schema.sql" /opt/sefya/schema.sql 2>/dev/null || true

echo "==> Building frontend..."
cd "$APP_DIR/frontend"
npm install --silent
npm run build

echo "==> Deploying frontend..."
rm -rf "$FRONTEND_DEST"
cp -r dist "$FRONTEND_DEST"

echo "==> Restarting backend..."
sudo systemctl restart sefya-api

echo "==> Done! Deploy successful."
