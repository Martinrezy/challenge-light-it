#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND="$ROOT/backend"
OVERLAYS="$ROOT/infra/overlays"
TMP="$ROOT/backend-tmp"

if [[ -f "$BACKEND/artisan" ]]; then
  echo "Laravel ya está instalado en backend/"
  exit 0
fi

echo "Instalando Laravel 11 en backend/..."

if command -v docker &>/dev/null; then
  docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$ROOT:/app" \
    -w /app \
    composer:2 \
    create-project laravel/laravel backend-tmp --prefer-dist --no-interaction
else
  if ! command -v composer &>/dev/null; then
    echo "Error: necesitás Docker o Composer instalado localmente."
    exit 1
  fi
  composer create-project laravel/laravel "$TMP" --prefer-dist --no-interaction
fi

# Preservar archivos de infra propios antes de fusionar
preserve=(
  "Dockerfile"
  "docker"
  "README.md"
)

for item in "${preserve[@]}"; do
  if [[ -e "$BACKEND/$item" ]]; then
    mv "$BACKEND/$item" "$ROOT/.preserve-$item"
  fi
done

shopt -s dotglob
for entry in "$TMP"/*; do
  name="$(basename "$entry")"
  if [[ -e "$BACKEND/$name" ]]; then
    rm -rf "$BACKEND/$name"
  fi
  mv "$entry" "$BACKEND/"
done
shopt -u dotglob
rmdir "$TMP" 2>/dev/null || rm -rf "$TMP"

for item in "${preserve[@]}"; do
  if [[ -e "$ROOT/.preserve-$item" ]]; then
    rm -rf "$BACKEND/$item"
    mv "$ROOT/.preserve-$item" "$BACKEND/$item"
  fi
done

if [[ -d "$OVERLAYS" ]]; then
  echo "Aplicando overlays de estructura..."
  cp -R "$OVERLAYS/." "$BACKEND/"
fi

if [[ ! -f "$BACKEND/.env" && -f "$BACKEND/.env.example" ]]; then
  cp "$BACKEND/.env.example" "$BACKEND/.env"
fi

echo "Backend listo. Ejecutá: docker compose up -d"
