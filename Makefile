.PHONY: setup setup-backend setup-frontend up down logs docker-reset dev-local up-infra

setup: setup-backend setup-frontend

setup-backend:
	@./scripts/setup-backend.sh

setup-frontend:
	cd frontend && npm install

up:
	docker compose up -d

docker-reset:
	@./scripts/docker-reset.sh

dev-local:
	@./scripts/dev-local.sh

up-infra:
	docker compose -f docker-compose.infra.yml up -d

up-logs:
	docker compose up

down:
	docker compose down

logs:
	docker compose logs -f
