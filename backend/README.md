# Epayco Digital Wallet - Backend

![Logo del Proyecto](./public/epayco.png)

## Resumen del Proyecto
Backend de la billetera digital Epayco. Proporciona una API RESTful para la gestión de clientes, recarga de saldo, pagos y confirmación de transacciones, utilizando NestJS y MySQL. Incluye autenticación por tokens y arquitectura modular.

## Tabla de Contenidos
- [Resumen del Proyecto](#resumen-del-proyecto)
- [Instalación de Requisitos Previos](#instalación-de-requisitos-previos)
- [Cómo Descargar e Instalar Dependencias](#cómo-descargar-e-instalar-dependencias)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
  - [Desarrollo Local](#desarrollo-local)
  - [Producción](#producción)
  - [Migraciones y Seeds](#migraciones-y-seeds)
- [Variables de Entorno](#variables-de-entorno)
- [Resumen de Carpetas](#resumen-de-carpetas)
- [Principales Dependencias](#principales-dependencias)
- [Contribuyendo](#contribuyendo)

## Instalación de Requisitos Previos
- Node.js >= 22.0.0 (recomendado: v22.21.1, ver `.nvmrc`)
- pnpm >= 10.11.0
- MySQL >= 8.0
- Git

## Cómo Descargar e Instalar Dependencias
1. Clona el repositorio:
	```sh
	git clone <REPO_URL>
	cd epayco-digital-wallet/backend
	```
2. Copia el archivo de variables de entorno:
	```sh
	cp .env.example .env
	```
3. Configura las variables de entorno críticas en `.env` (ver sección [Variables de Entorno](#variables-de-entorno)).
4. Instala las dependencias:
	```sh
	pnpm install
	```

## Cómo Ejecutar el Proyecto

### Desarrollo Local
1. Asegúrate de tener una base de datos MySQL corriendo y configurada en `.env`.
2. Inicia el servidor de desarrollo con hot reload:
	```sh
	pnpm dev
	```
	El backend se ejecuta por defecto en http://localhost:4000

### Producción
1. Compila el proyecto:
	```sh
	pnpm build
	```
2. Inicia el servidor en modo producción:
	```sh
	pnpm start:prod
	```

### Migraciones y Seeds
- Ejecuta migraciones:
  ```sh
  pnpm migration:run
  ```
- Revertir la última migración:
  ```sh
  pnpm migration:revert
  ```
- Ejecutar seeds:
  ```sh
  pnpm seed:run
  ```

## Variables de Entorno
Ejemplo de `.env`:
```sh
NODE_ENV=development

PORT=4000

FRONTEND_URL=http://localhost:3000

MYSQL_MIGRATIONS_TABLE=migrations
MYSQL_DB_URI=mysql://root:root@localhost:3306/epayco_db
```

## Resumen de Carpetas
- **src/**: Código fuente principal
  - **app.module.ts**: Módulo raíz de la aplicación
  - **main.ts**: Punto de entrada principal
  - **client/**: Módulo de clientes (controlador, servicio, DTOs, entidad)
  - **token/**: Módulo de tokens (servicio, entidad, enums, interfaces)
  - **database/**: Configuración de TypeORM, migraciones y seeds
  - **shared/**: Clases base, enums, validadores, errores comunes
- **public/**: Archivos públicos/estáticos
- **types/**: Tipos globales TypeScript

## Principales Dependencias
- **@nestjs/core**: ^11.0.1
- **@nestjs/common**: ^11.0.1
- **@nestjs/config**: 4.0.2
- **@nestjs/typeorm**: 11.0.0
- **typeorm**: 0.3.28
- **typeorm-extension**: 3.7.3
- **mysql2**: 3.16.2
- **class-validator**: 0.14.3
- **class-transformer**: 0.5.1
- **dotenv**: 17.2.3
- **joi**: 18.0.2
- **uuid**: 13.0.0

## Scripts Útiles
```sh
pnpm dev            # Desarrollo con hot reload
pnpm build          # Compila el proyecto
pnpm start:prod     # Ejecuta en producción
pnpm migration:run  # Ejecuta migraciones
pnpm seed:run       # Ejecuta seeds
pnpm lint           # Linting con ESLint
pnpm format         # Formatea código con Prettier
pnpm test           # Ejecuta pruebas unitarias
```

## Contribuyendo
1. Crea una rama para tu feature:
	```sh
	git checkout -b feat/mi-feature
	```
2. Realiza tus cambios siguiendo las buenas prácticas de NestJS y TypeScript.
3. Asegúrate de que el código pase todas las validaciones (`pnpm lint`, `pnpm test`).
4. Haz commit siguiendo [Conventional Commits](https://www.conventionalcommits.org/):
	```sh
	git commit -m 'feat: agrega nueva funcionalidad'
	```
5. Abre un Pull Request con una descripción clara de los cambios.
