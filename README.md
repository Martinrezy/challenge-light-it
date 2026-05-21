# Patient Registration — FullStack Challenge

Laravel API + React SPA + PostgreSQL, orchestrated with Docker Compose.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Free ports on the host: **5173**, **8000**, **8025**, **5433**

Node.js and PHP are **not** required if you run everything with Docker (default).

## Run the project

```bash
git clone https://github.com/Martinrezy/challenge-light-it.git
cd challenge-light-it
make docker-reset
```

`make docker-reset` stops containers, rebuilds images, and starts all services.

On the **first run**, allow about **1–2 minutes** for image build, `composer install` inside the backend container, and database migrations.

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:8000/api |
| API health check | http://localhost:8000/api/health |
| Mailpit (captured emails) | http://localhost:8025 |

Alternative without rebuild:

```bash
docker compose up -d --build
```

## Docker services

| Container | Role |
|-----------|------|
| `postgres` | Database (`patients` / user `patients`, host port **5433**) |
| `backend` | Laravel API on port **8000** |
| `queue` | `php artisan queue:work` (async mail) |
| `frontend` | Vite dev server on port **5173** |
| `mailpit` | SMTP catcher + web UI on port **8025** |

Backend uses `backend/.env.docker` when `DOCKER_ENV=true` (set in Compose). The entrypoint waits for Postgres, runs migrations, and `storage:link`.

## API (reference)

| Method | Endpoint |
|--------|----------|
| GET | `/api/health` |
| GET | `/api/patients` |
| POST | `/api/patients` | multipart/form-data |
| DELETE | `/api/patients/{id}` |

## Useful commands

```bash
docker compose logs -f backend    # API / migrations / errors
docker compose logs -f queue      # email jobs
docker compose ps                 # service status
make down                         # stop containers
```

## Troubleshooting

- **App or API not responding right after start** — wait for backend logs to show `[entrypoint] Ready`, then retry the health URL.
- **Port already in use** — stop whatever is bound to 5173/8000/8025/5433, or change the host mapping in `docker-compose.yml`.
- **Emails not in Mailpit** — confirm the `queue` container is running (`docker compose ps`); registration emails are queued, not sent synchronously.
- **Reset from scratch** — `make docker-reset` (rebuilds images; slower but consistent).

## Optional: local development (no frontend container)

Requires Node.js 20+ and Docker for Postgres/Mailpit:

```bash
make up-infra
docker compose up -d backend queue
cd frontend && npm install && npm run dev
```

Frontend expects `VITE_API_URL=http://localhost:8000/api` (default in Compose for the Dockerized frontend).
