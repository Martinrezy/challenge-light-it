# Patient Registration — FullStack Challenge

Aplicación de registro de pacientes con **Laravel** (API) y **React** (SPA), PostgreSQL y Docker.

## Estado del repositorio

| Rama | Contenido |
|------|-----------|
| `main` | Estructura del proyecto, Docker, overlays y scaffolding |
| `feature/*` | Implementación de funcionalidades (crear antes de codear) |

### Flujo de trabajo con Git

```bash
# 1. Estructura ya está en main — commitear y pushear si corresponde
git add .
git commit -m "chore: project structure (Laravel + React + Docker)"

# 2. Antes de implementar features, crear rama
git checkout -b feature/patient-registration

# 3. Instalar Laravel en backend (solo la primera vez)
make setup-backend

# 4. Instalar dependencias del frontend
make setup-frontend

# 5. Levantar entorno
docker compose up -d
```

> **Importante:** no implementar la lógica del challenge en `main`. Toda la funcionalidad va en la rama de feature.

## Estructura del proyecto

```
challenge-light-it/
├── backend/                 # Laravel API (se instala con make setup-backend)
│   ├── docker/
│   └── Dockerfile
├── frontend/                # React + Vite + TypeScript
│   └── src/
│       ├── components/      # common | patients | forms
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── styles/
├── infra/overlays/          # Carpetas y stubs que se copian al instalar Laravel
├── scripts/setup-backend.sh
├── docker-compose.yml
└── Makefile
```

## Requisitos

- Docker y Docker Compose
- Node.js 20+ (para desarrollo local del frontend)
- Make (opcional)

## Setup inicial

```bash
make setup          # backend (Laravel) + frontend (npm)
docker compose up -d
```

### URLs locales

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:8000/api |
| Mailpit (emails) | http://localhost:8025 |
| PostgreSQL | localhost:5432 |

## Stack

- **Backend:** Laravel 11, PostgreSQL, colas (`database`), Mailpit
- **Frontend:** React 19, TypeScript, Vite, ESLint, Prettier
- **Sin UI kits** (no Material UI / shadcn) — componentes propios

## Funcionalidades a implementar (rama feature)

Ver enunciado del challenge. Resumen:

**Backend:** API de registro, validación Laravel, email único, foto de documento, PostgreSQL, email async, Docker.

**Frontend:** Tarjetas expandibles, formulario con drag & drop JPG, validación (letras, @gmail.com, teléfono en 2 campos), modal de estados, refresh automático.

**Futuro:** preparar capa de notificaciones para SMS (`app/Services/Notifications/`).

## Anonimato

No incluir nombre personal en el código fuente (requisito del challenge).
