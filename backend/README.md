# Backend (Laravel API)

API REST para registro de pacientes.

## Estructura prevista

```
app/
├── Http/
│   ├── Controllers/Api/   # PatientController
│   └── Requests/          # StorePatientRequest (validación Laravel)
├── Jobs/                  # Envío async de email
├── Models/                # Patient
├── Notifications/         # Email de confirmación
└── Services/
    └── Notifications/     # Preparado para SMS (futuro)
database/migrations/
routes/api.php
```

## Setup

Desde la raíz del repositorio:

```bash
make setup-backend
```

Requiere Docker o Composer local. Instala Laravel 11 y aplica los overlays de `infra/overlays/`.
