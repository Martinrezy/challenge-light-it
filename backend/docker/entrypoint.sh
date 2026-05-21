#!/usr/bin/env bash
set -e

cd /var/www/html

if [[ ! -f artisan ]]; then
  echo "Laravel no instalado. Ejecutá 'make setup-backend' desde la raíz del proyecto."
  exit 1
fi

if [[ ! -d vendor ]]; then
  composer install --no-interaction --prefer-dist
fi

if ! grep -q "APP_KEY=base64:" .env 2>/dev/null; then
  php artisan key:generate --force
fi

php artisan migrate --force 2>/dev/null || true

exec "$@"
