# Base de datos (MySQL + TypeORM)

Este backend usa **MySQL** como base de datos y **TypeORM** (vía NestJS) como ORM.

## Cómo se configura la BD

El DataSource de TypeORM está definido en [src/database/data-source.ts](../src/database/data-source.ts).

Puntos clave:

- `type: 'mysql'`
- La conexión se define con `MYSQL_DB_URI` (una sola cadena de conexión)
- `synchronize: false` (el esquema se controla mediante migraciones)
- Las entidades se cargan desde `src/**/**/*.entity.ts`
- Las migraciones se cargan desde `src/database/migrations/*.{ts,js}`

### Variables de entorno requeridas

Ejemplo (igual que en el README del backend):

```ini
MYSQL_DB_URI=mysql://root:root@localhost:3306/epayco_db
MYSQL_MIGRATIONS_TABLE=migrations
```

Notes:

- `MYSQL_DB_URI` lo usa TypeORM para conectarse.
- `MYSQL_MIGRATIONS_TABLE` es el nombre de la tabla de historial de migraciones (TypeORM la usa para registrar las migraciones ejecutadas).

---

## Entidades y tablas

Todas las entidades viven bajo `src/**/model/*.entity.ts`.

### 1) `customers`

Entity: `CustomerEntity` in `src/customers/model/customer.entity.ts`

Columnas:

- `id` (PK, int, auto-increment)
- `documento` (varchar, **unique**)
- `nombres` (varchar)
- `email` (varchar, **unique**)
- `celular` (varchar, **unique**)
- `created_at` (datetime)
- `updated_at` (datetime)
- `deleted_at` (datetime nullable, borrado lógico/soft-delete)

Relaciones:

- Un Customer **1 → N** Wallets (`wallets.customer_id`)
- Un Customer **1 → N** Payments (`payments.customer_id`)

### 2) `wallets`

Entity: `WalletEntity` in `src/wallets/model/wallet.entity.ts`

Columnas:

- `id` (PK, int, auto-increment)
- `balance` (double, default `0`)
- `customer_id` (FK → `customers.id`, no null)
- `createdAt` (datetime)
- `updatedAt` (datetime)

Relaciones:

- Un Wallet **N → 1** Customer
- Un Wallet **1 → N** Payments (`payments.wallet_id`)

### 3) `payments`

Entity: `PaymentEntity` in `src/payments/model/payment.entity.ts`

Columnas:

- `id` (PK, int, auto-increment)
- `amount` (decimal(14,2))
- `status` (varchar, default `pending`)
- `wallet_id` (FK → `wallets.id`, nullable)
- `customer_id` (FK → `customers.id`, nullable)
- `session_id` (FK → `payment_sessions.id`, nullable, **unique** porque es 1:1)
- `createdAt` (datetime)
- `updatedAt` (datetime)

Relaciones:

- Un Payment **N → 1** Wallet
- Un Payment **N → 1** Customer
- Un Payment **1 ↔ 1** PaymentSession (`payments.session_id`)

### 4) `payment_sessions`

Entity: `PaymentSessionEntity` in `src/payment-sessions/model/payment-session.entity.ts`

Columnas:

- `id` (PK, int, auto-increment)
- `uuid` (char(36) / varchar(36) generado, poblado con MySQL `UUID()`)
- `otp` (varchar)
- `expiresAt` (datetime)
- `confirmed` (boolean/tinyint, default `false`)
- `createdAt` (datetime)
- `updatedAt` (datetime)

Relaciones:

- Un PaymentSession **1 ↔ 1** Payment

### 5) `topups`

Entity: `TopupEntity` in `src/topups/model/topup.entity.ts`

Columnas:

- `id` (PK, int, auto-increment)
- `amount` (decimal(14,2))
- `customer_id` (FK → `customers.id`, nullable)
- `wallet_id` (FK → `wallets.id`, nullable)
- `createdAt` (datetime)
- `updatedAt` (datetime)

Relaciones:

- Un Topup **N → 1** Customer
- Un Topup **N → 1** Wallet

---

## Diagrama Entidad-Relación (ERD)

Diagrama ER en Mermaid (soportado por GitHub y la mayoría de renderizadores Markdown en VS Code):

```mermaid
erDiagram
  CUSTOMERS {
    int id PK
    varchar documento UK
    varchar nombres
    varchar email UK
    varchar celular UK
    datetime created_at
    datetime updated_at
    datetime deleted_at
  }

  WALLETS {
    int id PK
    double balance
    int customer_id FK
    datetime createdAt
    datetime updatedAt
  }

  PAYMENTS {
    int id PK
    decimal amount
    varchar status
    int wallet_id FK
    int customer_id FK
    int session_id FK
    datetime createdAt
    datetime updatedAt
  }

  PAYMENT_SESSIONS {
    int id PK
    varchar uuid
    varchar otp
    datetime expiresAt
    boolean confirmed
    datetime createdAt
    datetime updatedAt
  }

  TOPUPS {
    int id PK
    decimal amount
    int customer_id FK
    int wallet_id FK
    datetime createdAt
    datetime updatedAt
  }

  CUSTOMERS ||--o{ WALLETS : has
  CUSTOMERS ||--o{ PAYMENTS : makes
  WALLETS   ||--o{ PAYMENTS : funds

  PAYMENT_SESSIONS ||--o| PAYMENTS : validates

  CUSTOMERS ||--o{ TOPUPS : requests
  WALLETS   ||--o{ TOPUPS : credits
```

Relationship notes:

Notas sobre las relaciones:

- Un customer puede tener **muchos wallets**.
- Un wallet puede tener **muchos payments**.
- Un customer puede tener **muchos payments**.
- Un payment puede tener **cero o una** sesión (nullable `session_id`).
- Una sesión se mapea a **cero o un** payment (1:1; forzado por un índice unique en `payments.session_id`).
- Los topups pertenecen a un customer y a un wallet (ambos nullable a nivel de BD en la migración inicial).

---

## Esquema de base de datos (vista SQL)

Esta es una vista simplificada del esquema basada en las migraciones y definiciones de entidades actuales (usa las migraciones como fuente de verdad):

- `customers`
  - PK: `id`
  - UK: `documento`, `email`, `celular`
- `wallets`
  - PK: `id`
  - FK: `customer_id → customers.id`
- `payments`
  - PK: `id`
  - FK: `wallet_id → wallets.id`
  - FK: `customer_id → customers.id`
  - FK: `session_id → payment_sessions.id`
  - Unique: `session_id`
- `payment_sessions`
  - PK: `id`
  - `uuid` poblado con MySQL `UUID()`
- `topups`
  - PK: `id`
  - FK: `customer_id → customers.id`
  - FK: `wallet_id → wallets.id`

---

## Migraciones: crear, generar, ejecutar

Las migraciones se almacenan en `src/database/migrations/`.

### Migraciones existentes en este repo

- `1769990788991-init-migrations-migration.ts`: crea las tablas iniciales + llaves foráneas.
- `1769993101757-fix-balance-field-migration.ts`: cambia `wallets.balance` de decimal a double.
- `1769996082250-add-uuid-to-payment_sessions-migration.ts`: agrega `uuid` a `payment_sessions` y rellena (backfill) las filas existentes.

### Crear una migración vacía

Úsalo cuando quieras escribir SQL manualmente:

```bash
pnpm migration:create --name=add-some-table
```

Esto genera un archivo nuevo en `src/database/migrations/`.

### Generar una migración desde cambios en entidades

Úsalo cuando hayas cambiado las definiciones de entidades y quieras que TypeORM haga diff contra el esquema actual de la BD:

```bash
pnpm migration:generate --name=update-wallet-schema
```

Importante:

- Asegúrate de que la BD esté corriendo y que `MYSQL_DB_URI` apunte a ella.
- Asegúrate de que las migraciones ya aplicadas representen el esquema desde el cual estás generando el diff.
- Revisa el SQL generado; no asumas que es correcto sin validarlo.

### Ejecutar migraciones

```bash
pnpm migration:run
```

Esto ejecutará cualquier migración pendiente y las registrará en la tabla de migraciones.

### Revertir la última migración

```bash
pnpm migration:revert
```

---

## Seeds (opcional)

Este proyecto está configurado con `typeorm-extension` para seeding.

- La ruta de los scripts de seed se configura en [src/database/data-source.ts](../src/database/data-source.ts) bajo `seeds`.
- Ejecuta los seeds con:

```bash
pnpm seed:run
```
