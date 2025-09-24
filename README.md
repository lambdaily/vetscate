# Instrucciones para correr el proyecto

Resumen rápido
- Proyecto NestJS con TypeORM + SQLite (archivo local `db.sqlite`).
- Endpoints principales: autenticación, usuarios, rooms, reservations.
- Auto-crea tablas por `synchronize: true`. Revisar migraciones en `src/migrations`.

Requisitos
- Node >= 18 (testeado con node v20.11.0)
- npm >= 9 o yarn
- .env configurado (ver [.env.example](.env.example))

Archivos relevantes
- Configuración app: [`src/main.ts`](src/main.ts), [`src/app.module.ts`](src/app.module.ts)
- Config/env: [`EnvConfiguration`](src/core/config/env.config.ts) ([`src/core/config/joi.validation.ts`](src/core/config/joi.validation.ts))
- Auth: [`AuthModule`](src/auth/auth.module.ts), [`AuthController`](src/auth/auth.controller.ts), [`AuthService`](src/auth/auth.service.ts), [`JwtStrategy`](src/auth/strategies/jwt-strategy.ts)
- Rooms: [`Room`](src/room/entities/room.entity.ts), [`RoomController`](src/room/room.controller.ts), [`RoomService`](src/room/room.service.ts)
- Reservations: [`Reservation`](src/reservations/entities/reservation.entity.ts), [`ReservationsController`](src/reservations/reservations.controller.ts), [`ReservationsService`](src/reservations/reservations.service.ts)
- Users/Roles: [`User`](src/user/entities/user.entity.ts), [`UserModule`](src/user/user.module.ts), servicios en [`src/user/services`](src/user/services)

Instalación (local)
1. Copia archivo de entorno:
   - Windows / Linux / macOS:
     - cp .env.example .env
   - Edítalo: define `JWT_SECRET` y `JWT_EXPIRATION` (ej: `JWT_EXPIRATION=1h`).

2. Instala dependencias:
   - yarn
   - o npm install

Arrancar en desarrollo
- yarn start:dev
- o npm run start:dev (si lo configuras)


Base de datos
- El proyecto usa SQLite (ver [`TypeOrmModule.forRoot` in src/app.module.ts](src/app.module.ts)). 

Para poder ingresar al resumen de endpoints con swagger:
- http://localhost:8000/api/doc/

En caso de requerir utilizar postman:
En la carpeta principal tambien se encuentra un archivo:`Vetscate.postman_collection.json`


Uso de la API (ejemplos)
- Prefijo base: `/api` (configurado en [`src/main.ts`](src/main.ts))

1) Registrar usuario
- POST /api/auth/register
- Body (JSON):
  {
    "firstName":"Pablo",
    "lastName":"Espinoza",
    "email":"pablo@example.com",
    "phone":"123123123",
    "password":"123456",
    "roleIds":[1]
  }
- Controlador: [`AuthController`](src/auth/auth.controller.ts)

2) Login
- POST /api/auth/login
- Body (JSON):
  {
    "email":"pablo@example.com",
    "password":"123456"
  }
- Respuesta contiene `accessToken` (JWT). Servicio: [`AuthService`](src/auth/auth.service.ts)

3) Obtener perfil del token
- GET /api/auth/me
- Header: Authorization: Bearer <accessToken>
- Protegido por: [`Auth` decorator`](src/auth/decorators/auth.decorator.ts) y [`JwtStrategy`](src/auth/strategies/jwt-strategy.ts)

4) Rooms
- POST /api/room  -> crear sala (body: name, capacity)
- GET /api/room   -> listar salas
- Implementado en: [`RoomController`](src/room/room.controller.ts) y [`RoomService`](src/room/room.service.ts)

5) Reservations
- POST /api/reservations  -> crear reserva (requerido Bearer)
  Body:
  {
    "roomId": 1,
    "startTime": "2025-09-24T10:00:00.000Z",
    "endTime": "2025-09-24T12:00:00.000Z"
  }
- GET /api/reservations/me -> listar reservas del usuario autenticado
- Lógica y validaciones en: [`ReservationsService`](src/reservations/reservations.service.ts) y entidad [`Reservation`](src/reservations/entities/reservation.entity.ts)
  - endTime > startTime (se valida)
  - no solapamiento (query en service)

Problemas comunes
- Error Passport / "defaultStrategy": asegurarse que cada módulo que usa `@Auth()` importe `PassportModule` (ej: [`src/user/user.module.ts`](src/user/user.module.ts), [`src/room/room.module.ts`](src/room/room.module.ts), [`src/reservations/reservations.module.ts`](src/reservations/reservations.module.ts)).
- JWT vacío / mismatch: revisar `JWT_SECRET` en `.env` y configuración de [`JwtModule`](src/auth/auth.module.ts) y [`JwtStrategy`](src/auth/strategies/jwt-strategy.ts).
- Si recibes error relacionado con TypeORM/entidades: revisar que las entidades están exportadas y `autoLoadEntities: true` en [`src/app.module.ts`](src/app.module.ts).

Endpoints mapeados (ver logs al iniciar app)
- Health: GET /api/health, GET /api/health/test (`HealthController` in [`src/core/health/health.controller.ts`](src/core/health/health.controller.ts))
- Auth: /api/auth (register, login, me)
- User: /api/user
- Role: /api/role
- Room: /api/room
- Reservations: /api/reservations

Apoyos del proyecto
- Validación: `class-validator` en DTOs (ej: [`src/reservations/dto/create-reservation.dto.ts`](src/reservations/dto/create-reservation.dto.ts))
- Logging y contexto de petición: [`AppLogger`](src/config/app.logger.ts), [`SessionService`](src/config/base/session.service.ts), interceptor [`LoggingInterceptor`](src/config/interceptors/Logging.interceptor.ts)
- Estructura base: `BaseService`, `BaseController` en `src/base`

