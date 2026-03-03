# thuy_shop — NestJS Backend

> This file gives the AI agent (Antigravity) a high-level understanding of the project
> before starting any task. **Read this first before touching any code.**

---

## Project Purpose

An e-commerce backend (book/product shop) built with NestJS. Core domains:

- **Auth** — JWT authentication with access & refresh tokens
- **User** — user account management
- **Product** — product catalog with categories
- **Shopping Cart** — cart management per user
- **Banner** — promotional banners
- **Storage** — file uploads via MinIO (S3-compatible)

---

## Tech Stack

| Layer        | Technology                                 |
| ------------ | ------------------------------------------ |
| Framework    | NestJS 10                                  |
| Language     | TypeScript 5                               |
| ORM          | TypeORM 0.3                                |
| Database     | MySQL 8 (via `mysql2`)                     |
| Auth         | JWT (`@nestjs/jwt`, `passport-jwt`)        |
| File Storage | MinIO (`nestjs-minio-client`)              |
| Validation   | `class-validator` + `class-transformer`    |
| API Docs     | Swagger (`@nestjs/swagger`) at `/api`      |
| Testing      | Jest + Supertest (E2E: `npm run test:e2e`) |
| Logging      | Winston + custom `LoggingInterceptor`      |
| Compression  | `compression` middleware                   |

---

## Project Structure

```
src/
├── app.module.ts               ← Root module
├── main.ts                     ← Bootstrap (global pipes, interceptors, Swagger)
├── modules/                    ← Feature modules (one folder per domain)
│   ├── auth/                   ← Login, register, JWT tokens
│   │   ├── entities/           ← access-token.entity.ts, refresh-token.entity.ts
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── services/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── user/                   ← User profile management
│   ├── product/                ← Product catalog
│   ├── shopping-card/          ← Shopping cart (note: not "cart")
│   ├── banner/                 ← Promotional banners
│   ├── storage/                ← MinIO file upload
│   ├── article/
│   ├── category/
│   ├── feedback/
│   └── notification/
├── common/                     ← Shared, reusable code
│   ├── bases/                  ← Base classes/entities
│   ├── decorator/              ← Custom decorators
│   ├── dto/                    ← Shared DTOs (pagination, response wrappers)
│   ├── entity/                 ← Shared entities
│   ├── errors/
│   ├── exceptions/             ← Custom exception classes
│   ├── filters/                ← Global exception filter
│   ├── guards/                 ← Auth guard, role guard
│   └── interceptors/           ← LoggingInterceptor, ClassSerializerInterceptor
├── config/
│   ├── app.config.ts           ← AppConfig, SecurityConfig, MinIoConfig tokens
│   ├── swagger.config.ts       ← Swagger setup
│   └── typeorm/
│       ├── database.config.ts  ← TypeOrmConfigService + DataSource (for CLI)
│       └── typeorm-logger.ts
├── migrations/                 ← TypeORM migration files
├── testing/                    ← Shared test helpers/factories
└── utils/                      ← Utility functions
```

---

## Global Bootstrap (main.ts)

The app is bootstrapped with these globals applied to **every** request:

- `ValidationPipe()` — validates all DTOs automatically
- `ClassSerializerInterceptor` — transforms responses using `class-transformer` (`exposeAll` strategy, `excludeExtraneousValues: true`)
- `LoggingInterceptor` — logs all requests
- `compression` — gzip compression middleware
- `cors: true` — CORS enabled globally

> ⚠️ `excludeExtraneousValues: true` means **only properties decorated with `@Expose()` are included in responses**. Always add `@Expose()` to DTO properties.

---

## Environment Variables

See `.example.env` for reference. Key variables:

| Variable                | Description                             |
| ----------------------- | --------------------------------------- |
| `APP_PORT`              | Server port (default 3005)              |
| `MYSQL_HOSTNAME`        | DB host                                 |
| `MYSQL_PORT`            | DB port (3306)                          |
| `MYSQL_USERNAME`        | DB user                                 |
| `MYSQL_PASSWORD`        | DB password                             |
| `MYSQL_DATABASE`        | DB name (BookSharing)                   |
| `DB_SYNCHRONIZE`        | Auto-sync schema (`true` in dev only)   |
| `DB_LOGGING`            | Enable TypeORM query logging            |
| `JWT_SECRET`            | JWT signing secret                      |
| `JWT_EXPRIRE`           | JWT expiry in seconds (604800 = 1 week) |
| `MINIO_END_POINT`       | MinIO server host                       |
| `MINIO_ACCESS_KEY`      | MinIO access key                        |
| `MINIO_ACCESS_PASSWORD` | MinIO secret key                        |
| `MINIO_BUCKET_NAME`     | Default bucket name                     |

---

## Coding Conventions

### Naming

- Files: `kebab-case` (e.g., `shopping-card.service.ts`)
- Classes: `PascalCase` (e.g., `ShoppingCardService`)
- Variables/methods: `camelCase`
- Database columns: `snake_case` via `{ name: 'column_name' }` in `@Column()`

### Entities

- Primary keys: always `uuid` — **never** auto-increment integers
- Timestamps: use `@CreateDateColumn()` and `@UpdateDateColumn()`
- Soft deletes: use `isActive: boolean` — **never hard-delete** records
- All entities live in `entities/` subfolder of their module

### DTOs & Responses

- Always use `class-validator` decorators (`@IsString()`, `@IsOptional()`, etc.)
- Always use `@Expose()` on every DTO property (required by `ClassSerializerInterceptor`)
- **Never** return raw entities from controllers — always map to response DTOs
- Use `@ApiProperty()` on all DTO fields for Swagger

### Services

- Services contain **business logic only** — no raw SQL or query builders
- Complex queries belong in a **repository class**, not the service
- Throw `NotFoundException`, `BadRequestException`, `ForbiddenException`, etc. from services (not controllers)

### Modules

- Each feature = one folder in `src/modules/`
- Each module must have: `*.module.ts`, `*.service.ts`, `*.controller.ts`
- Shared providers must be exported from their module and imported via module (not re-declared)

---

## Running Commands

```bash
# Development
npm run start:dev

# Run E2E Tests
npm run test:e2e

# Run Unit Tests
npm test

# Database Migrations
npm run typeorm:generate -- src/migrations/MigrationName   # generate
npm run typeorm:migrate                                      # run
npm run typeorm:revert                                       # rollback
npm run typeorm:drop                                         # drop all tables ⚠️
```

---

## Available Skills

Before starting a task, check if a relevant skill applies:

| Task                                           | Skill                                          |
| ---------------------------------------------- | ---------------------------------------------- |
| Writing or refactoring NestJS code             | `.agents/skills/nestjs-practice/SKILL.md`      |
| Using TypeORM (queries, relations, migrations) | `.agents/skills/typeorm/SKILL.md`              |
| Writing E2E tests                              | `.agents/skills/e2e-testing-patterns/SKILL.md` |
| Code review / audit                            | `.agents/skills/code-reviewer/SKILL.md`        |

---

## Key Domain Documents

| Topic                            | File                                                        |
| -------------------------------- | ----------------------------------------------------------- |
| User ↔ Store/Product connection | `.agents/docs/user-store.md`                                |
| Auth flow (JWT tokens)           | `.agents/docs/auth-flow.md` _(create when needed)_          |
| Shopping cart flow               | `.agents/docs/shopping-cart-flow.md` _(create when needed)_ |
