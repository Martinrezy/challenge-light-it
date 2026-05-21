#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND="$ROOT/backend"
TMP="$ROOT/backend-tmp"

if [[ -f "$BACKEND/artisan" ]]; then
  echo "Laravel is already installed in backend/"
  exit 0
fi

echo "Installing Laravel in backend/..."

if command -v docker &>/dev/null; then
  docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$ROOT:/app" \
    -w /app \
    composer:2 \
    create-project laravel/laravel backend-tmp --prefer-dist --no-interaction
else
  if ! command -v composer &>/dev/null; then
    echo "Error: Docker or Composer is required."
    exit 1
  fi
  composer create-project laravel/laravel "$TMP" --prefer-dist --no-interaction
fi

preserve=(Dockerfile docker)

for item in "${preserve[@]}"; do
  if [[ -e "$BACKEND/$item" ]]; then
    mv "$BACKEND/$item" "$ROOT/.preserve-$item"
  fi
done

shopt -s dotglob
for entry in "$TMP"/*; do
  name="$(basename "$entry")"
  [[ -e "$BACKEND/$name" ]] && rm -rf "$BACKEND/$name"
  mv "$entry" "$BACKEND/"
done
shopt -u dotglob
rm -rf "$TMP"

for item in "${preserve[@]}"; do
  if [[ -e "$ROOT/.preserve-$item" ]]; then
    rm -rf "$BACKEND/$item"
    mv "$ROOT/.preserve-$item" "$BACKEND/$item"
  fi
done

if [[ ! -f "$BACKEND/.env" && -f "$BACKEND/.env.example" ]]; then
  cp "$BACKEND/.env.example" "$BACKEND/.env"
fi

echo "Backend ready. Run: docker compose up -d"
