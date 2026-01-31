# Epayco Digital Wallet - Backend

![Logo del Proyecto](./public/epayco.png)

## Resumen del Proyecto
Backend de la billetera digital Epayco. Proporciona una API RESTful para la gestión de clientes, recarga de saldo, pagos y confirmación de transacciones, utilizando NestJS y MySQL. Incluye autenticación por tokens y arquitectura modular.

---

## Tabla de Contenidos
- [Resumen del Proyecto](#resumen-del-proyecto)
- [Instalación de Requisitos Previos](#instalación-de-requisitos-previos)
- [Cómo Descargar e Instalar Dependencias](#cómo-descargar-e-instalar-dependencias)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
  - [Desarrollo Local](#desarrollo-local)
  - [Producción](#producción)
  - [Migraciones y Seeds](#migraciones-y-seeds)
  - [Cómo Ejecutar el Proyecto con Docker](#cómo-ejecutar-el-proyecto-con-docker)
- [Variables de Entorno](#variables-de-entorno)
- [Resumen de Carpetas](#resumen-de-carpetas)
- [Principales Dependencias](#principales-dependencias)
- [Contribuyendo](#contribuyendo)

---

## Instalación de Requisitos Previos
- **Node.js** >= 22.0.0 (recomendado: v22.21.1, ver `.nvmrc`). Descárgalo desde [Node.js](https://nodejs.org/).
- **pnpm** >= 10.11.0. Instálalo siguiendo las instrucciones en [pnpm](https://pnpm.io/installation).
- **MySQL** >= 8.0. Descárgalo desde [MySQL](https://dev.mysql.com/downloads/).
- **Git**. Descárgalo desde [Git](https://git-scm.com/).

---

## Cómo Descargar e Instalar Dependencias
1. Clona el repositorio:
   ```bash
   git clone <REPO_URL>
   cd epayco-digital-wallet/backend
   ```
2. Copia el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
3. Configura las variables de entorno críticas en `.env` (ver sección [Variables de Entorno](#variables-de-entorno)).
4. Instala las dependencias:
   ```bash
   pnpm install
   ```

---

## Cómo Ejecutar el Proyecto

### Desarrollo Local
1. Asegúrate de tener una base de datos MySQL corriendo y configurada en `.env`.
2. Inicia el servidor de desarrollo con hot reload:
   ```bash
   pnpm dev
   ```
   El backend se ejecuta por defecto en [http://localhost:4000](http://localhost:4000).

### Producción
1. Compila el proyecto:
   ```bash
   pnpm build
   ```
2. Inicia el servidor en modo producción:
   ```bash
   pnpm start:prod
   ```

### Migraciones y Seeds
- Ejecuta migraciones:
  ```bash
  pnpm migration:run
  ```
- Revertir la última migración:
  ```bash
  pnpm migration:revert
  ```
- Ejecutar seeds:
  ```bash
  pnpm seed:run
  ```

---

## Cómo Ejecutar el Proyecto con Docker

### Dependencias Requeridas
- **Docker**: Asegúrate de tener Docker instalado en tu sistema. Descárgalo desde [Docker](https://www.docker.com/).

### Pasos para Levantar el Proyecto
1. Asegúrate de que los puertos necesarios (por defecto: `4000` para el backend y `3306` para MySQL) estén disponibles en tu máquina.
2. Copia el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
3. Configura las variables de entorno críticas en `.env` (ver sección [Variables de Entorno](#variables-de-entorno)).
4. Construye la imagen de Docker para el backend:
   ```bash
   docker build -t epayco-backend .
   ```
5. Levanta un contenedor para la base de datos MySQL:
   ```bash
   docker run -d \
     --name epayco-mysql \
     -e MYSQL_ROOT_PASSWORD=root \
     -e MYSQL_DATABASE=epayco_db \
     -p 3306:3306 \
     mysql:8.0
   ```
6. Levanta un contenedor para el backend:
   ```bash
   docker run -d \
     --name epayco-backend \
     --env-file .env \
     -p 4000:4000 \
     epayco-backend
   ```
7. Accede al backend en: [http://localhost:4000](http://localhost:4000).

### Comandos Útiles
- Detener un contenedor:
  ```bash
  docker stop <container_name>
  ```
- Ver logs de un contenedor:
  ```bash
  docker logs -f <container_name>
  ```
- Eliminar un contenedor:
  ```bash
  docker rm <container_name>
  ```

### Notas Adicionales
- Si necesitas cambiar los puertos o configuraciones, edita el archivo `.env` o los comandos de Docker.
- Asegúrate de que Docker esté corriendo antes de ejecutar los comandos.

---

## Variables de Entorno
Ejemplo de `.env`:
```ini
NODE_ENV=development

PORT=4000

FRONTEND_URL=http://localhost:3000

MYSQL_MIGRATIONS_TABLE=migrations
MYSQL_DB_URI=mysql://root:root@localhost:3306/epayco_db
```
- **NODE_ENV**: Define el entorno de ejecución (`development`, `production`).
- **PORT**: Puerto en el que se ejecutará el backend.
- **FRONTEND_URL**: URL del frontend para configurar CORS.
- **MYSQL_MIGRATIONS_TABLE**: Nombre de la tabla para las migraciones de TypeORM.
- **MYSQL_DB_URI**: URI de conexión a la base de datos MySQL.

---

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

---

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

---

## Scripts Útiles
```bash
pnpm dev            # Desarrollo con hot reload
pnpm build          # Compila el proyecto
pnpm start:prod     # Ejecuta en producción
pnpm migration:run  # Ejecuta migraciones
pnpm seed:run       # Ejecuta seeds
pnpm lint           # Linting con ESLint
pnpm format         # Formatea código con Prettier
pnpm test           # Ejecuta pruebas unitarias
```

---

## Contribuyendo
1. Crea una rama para tu feature:
   ```bash
   git checkout -b feat/mi-feature
   ```
2. Realiza tus cambios siguiendo las buenas prácticas de NestJS y TypeScript.
3. Asegúrate de que el código pase todas las validaciones:
   ```bash
   pnpm lint
   pnpm test
   ```
4. Haz commit siguiendo [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: agrega nueva funcionalidad"
   ```
5. Abre un Pull Request con una descripción clara de los cambios.
