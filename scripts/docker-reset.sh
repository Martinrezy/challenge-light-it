#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Stopping containers..."
docker compose down --remove-orphans 2>/dev/null || true

echo "==> Rebuilding images..."
docker compose build --no-cache backend queue frontend

echo "==> Starting services..."
docker compose up -d

echo ""
echo "Wait ~30 seconds, then open:"
echo "  API:      http://localhost:8000/api/health"
echo "  App:      http://localhost:5173"
echo "  Mailpit:  http://localhost:8025"
echo ""
echo "Backend logs: docker compose logs -f backend"
