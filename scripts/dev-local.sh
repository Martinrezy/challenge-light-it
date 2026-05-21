#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Starting Postgres + Mailpit only..."
docker compose -f docker-compose.infra.yml up -d

echo ""
echo "Terminal 2: cd frontend && npm run dev  -> http://localhost:5173"
echo "Terminal 3: docker compose up backend queue"
echo ""
echo "Full stack: make docker-reset"
