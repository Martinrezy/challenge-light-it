.PHONY: setup setup-backend setup-frontend up down logs

# Instala dependencias y prepara el entorno (primera vez)
setup: setup-backend setup-frontend

setup-backend:
	@./scripts/setup-backend.sh

setup-frontend:
	cd frontend && npm install

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f
