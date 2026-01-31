# Epayco Digital Wallet - Frontend

![Logo del Proyecto](./public/epayco.png)

## Resumen del Proyecto
Frontend de la billetera digital Epayco. Permite a los usuarios registrarse, iniciar sesión, recargar saldo, realizar pagos y consultar historial de transacciones. Construido con React 19, Vite, TanStack Router/Query, Zustand y Tailwind CSS.

## Tabla de Contenidos
- [Resumen del Proyecto](#resumen-del-proyecto)
- [Instalación de Requisitos Previos](#instalación-de-requisitos-previos)
- [Cómo Descargar e Instalar Dependencias](#cómo-descargar-e-instalar-dependencias)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
  - [Desarrollo Local](#desarrollo-local)
  - [Producción](#producción)
- [Variables de Entorno](#variables-de-entorno)
- [Resumen de Carpetas](#resumen-de-carpetas)
- [Principales Dependencias](#principales-dependencias)
- [Contribuyendo](#contribuyendo)

## Instalación de Requisitos Previos
- Node.js >= 22.0.0 (recomendado: v22.21.1, ver `.nvmrc`)
- pnpm >= 10.11.0
- Git

## Cómo Descargar e Instalar Dependencias
1. Clona el repositorio:
	```sh
	git clone <REPO_URL>
	cd epayco-digital-wallet/frontend
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
1. Asegúrate de tener el backend ejecutándose.
2. Inicia el servidor de desarrollo:
	```sh
	pnpm dev
	```
	Por defecto en http://localhost:3000

### Producción
1. Compila el proyecto:
	```sh
	pnpm build
	```
2. Previsualiza el build:
	```sh
	pnpm preview
	```

## Variables de Entorno
Ejemplo de `.env`:
```sh
PORT=3000

EPAYCO_BACKEND_URL=http://localhost:4000

EPAYCO_COOKIE_NAME=epayco_session
EPAYCO_SESSION_COOKIE_NAME=session_id
EPAYCO_SESSION_SECRET=your_session_secret_here
```

## Resumen de Carpetas
- **public/**: Archivos estáticos (logos, manifest, etc.)
- **src/**: Código fuente principal
  - **modules/auth/**: Autenticación, formularios, hooks y store
  - **modules/dashboard/**: Componentes y lógica del dashboard (saldo, recarga, pagos, historial)
  - **modules/ui/**: Componentes de UI reutilizables y layouts
  - **modules/utils/**: Utilidades y helpers
  - **routes/**: Definición de rutas principales
- **styles.css**: Estilos globales

## Principales Dependencias
- **React**: ^19.2.0
- **Vite**: ^7.1.7
- **@tanstack/react-router**: ^1.132.0
- **@tanstack/react-query**: ^5.66.5
- **Zustand**: 5.0.10
- **Tailwind CSS**: ^4.0.6
- **Lucide React**: ^0.544.0
- **Axios**: 1.13.4

## Scripts Útiles
```sh
pnpm dev        # Desarrollo con hot reload
pnpm build      # Compila el proyecto
pnpm preview    # Previsualiza el build
pnpm lint       # Linting con ESLint
pnpm format     # Formatea código con Prettier
pnpm check      # Lint + Format
pnpm test       # Ejecuta pruebas unitarias
```

## Contribuyendo
1. Crea una rama para tu feature:
	```sh
	git checkout -b feat/mi-feature
	```
2. Realiza tus cambios siguiendo buenas prácticas de React y TypeScript.
3. Asegúrate de que el código pase todas las validaciones (`pnpm lint`, `pnpm test`).
4. Haz commit siguiendo [Conventional Commits](https://www.conventionalcommits.org/):
	```sh
	git commit -m 'feat: agrega nueva funcionalidad'
	```
5. Abre un Pull Request con una descripción clara de los cambios.
