# Patient Registration — FullStack Challenge

Patient registration app built with **Laravel** (API) and **React** (SPA), PostgreSQL, and Docker.

## Repository layout

| Branch | Purpose |
|--------|---------|
| `main` | Project structure and Docker setup |
| `feature/*` | Feature implementation |

## Project structure

```
challenge-light-it/
├── backend/          # Laravel API
├── frontend/         # React + Vite + TypeScript
├── scripts/          # Setup and Docker helpers
├── docker-compose.yml
└── Makefile
```

## Requirements

- Docker Desktop
- Node.js 20+ (local frontend development)

## Quick start

```bash
git checkout feature/patient-registration
make setup-backend    # first time only
make setup-frontend   # first time only
make docker-reset     # build and start all services
```

| Service | URL |
|---------|-----|
| App | http://localhost:5173 |
| API health | http://localhost:8000/api/health |
| Mailpit | http://localhost:8025 |
| PostgreSQL (host) | `localhost:5433` |

## Stack

- **Backend:** Laravel 13, PostgreSQL, queue workers, Mailpit
- **Frontend:** React 19, TypeScript, Vite, ESLint, Prettier
- Custom UI components (no Material UI / shadcn)

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/patients` | List patients |
| POST | `/api/patients` | Register patient (multipart) |

## Features

**Backend:** Validation via Form Request, unique Gmail addresses, JPG document upload, async confirmation email, PostgreSQL.

**Frontend:** Expandable patient cards, drag-and-drop JPG upload, client-side validation on submit, status modal, auto-refresh after registration.

**Future SMS:** `app/Services/Notifications/SmsNotificationService.php` (stub).

## Git workflow

Implement features on a branch (not `main`):

```bash
git checkout -b feature/patient-registration
```

## Anonymity

Do not include personal names in source code (challenge requirement).
