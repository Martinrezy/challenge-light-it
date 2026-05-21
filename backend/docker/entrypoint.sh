#!/usr/bin/env bash
set -e

cd /var/www/html

echo "[entrypoint] Waiting for PostgreSQL..."

for i in $(seq 1 30); do
  if php -r "
    try {
      new PDO(
        'pgsql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
      );
      exit(0);
    } catch (Throwable \$e) {
      exit(1);
    }
  " 2>/dev/null; then
    echo "[entrypoint] PostgreSQL is ready."
    break
  fi
  if [[ "$i" -eq 30 ]]; then
    echo "[entrypoint] ERROR: Could not connect to PostgreSQL."
    exit 1
  fi
  sleep 2
done

if [[ "${DOCKER_ENV:-}" == "true" && -f .env.docker ]]; then
  cp .env.docker .env
fi

if [[ ! -f artisan ]]; then
  echo "[entrypoint] ERROR: Laravel not installed. Run: make setup-backend"
  exit 1
fi

if [[ ! -d vendor ]]; then
  echo "[entrypoint] Running composer install..."
  composer install --no-interaction --prefer-dist --no-dev
fi

echo "[entrypoint] Running migrations..."
php artisan migrate --force
php artisan storage:link --force 2>/dev/null || true

echo "[entrypoint] Ready."
exec "$@"
