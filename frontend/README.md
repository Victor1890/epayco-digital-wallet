# Epayco Digital Wallet - Frontend

![Logo del Proyecto](./public/epayco.png)

## Resumen del Proyecto
Frontend de la billetera digital Epayco. Permite a los usuarios registrarse, iniciar sesión, recargar saldo, realizar pagos y consultar historial de transacciones. Construido con React 19, Vite, TanStack Router/Query, Zustand y Tailwind CSS.

---

## Tabla de Contenidos
- [Resumen del Proyecto](#resumen-del-proyecto)
- [Instalación de Requisitos Previos](#instalación-de-requisitos-previos)
- [Cómo Descargar e Instalar Dependencias](#cómo-descargar-e-instalar-dependencias)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
  - [Desarrollo Local](#desarrollo-local)
  - [Producción](#producción)
  - [Cómo Ejecutar el Proyecto con Docker](#cómo-ejecutar-el-proyecto-con-docker)
- [Variables de Entorno](#variables-de-entorno)
- [Resumen de Carpetas](#resumen-de-carpetas)
- [Principales Dependencias](#principales-dependencias)
- [Contribuyendo](#contribuyendo)

---

## Instalación de Requisitos Previos
- **Node.js** >= 22.0.0 (recomendado: v22.21.1, ver `.nvmrc`). Descárgalo desde [Node.js](https://nodejs.org/).
- **pnpm** >= 10.11.0. Instálalo siguiendo las instrucciones en [pnpm](https://pnpm.io/installation).
- **Git**. Descárgalo desde [Git](https://git-scm.com/).

---

## Cómo Descargar e Instalar Dependencias
1. Clona el repositorio:
   ```bash
   git clone <REPO_URL>
   cd epayco-digital-wallet/frontend
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
1. Asegúrate de tener el backend ejecutándose.
2. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
   Por defecto en [http://localhost:3000](http://localhost:3000).

### Producción
1. Compila el proyecto:
   ```bash
   pnpm build
   ```
2. Previsualiza el build:
   ```bash
   pnpm preview
   ```

---

## Cómo Ejecutar el Proyecto con Docker

### Dependencias Requeridas
- **Docker**: Asegúrate de tener Docker instalado en tu sistema. Descárgalo desde [Docker](https://www.docker.com/).

### Pasos para Levantar el Proyecto
1. Asegúrate de que los puertos necesarios (por defecto: `3000` para el frontend) estén disponibles en tu máquina.
2. Copia el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
3. Configura las variables de entorno críticas en `.env` (ver sección [Variables de Entorno](#variables-de-entorno)).
4. Construye la imagen de Docker para el frontend:
   ```bash
   docker build -t epayco-frontend .
   ```
5. Levanta un contenedor para el frontend:
   ```bash
   docker run -d \
     --name epayco-frontend \
     --env-file .env \
     -p 3000:3000 \
     epayco-frontend
   ```
6. Accede al frontend en: [http://localhost:3000](http://localhost:3000).

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
PORT=3000

EPAYCO_BACKEND_URL=http://localhost:4000

EPAYCO_COOKIE_NAME=epayco_session
EPAYCO_SESSION_COOKIE_NAME=session_id
EPAYCO_SESSION_SECRET=your_session_secret_here
```
- **PORT**: Puerto en el que se ejecutará el frontend.
- **EPAYCO_BACKEND_URL**: URL del backend para las solicitudes API.
- **EPAYCO_COOKIE_NAME**: Nombre de la cookie principal.
- **EPAYCO_SESSION_COOKIE_NAME**: Nombre de la cookie de sesión.
- **EPAYCO_SESSION_SECRET**: Secreto para firmar las cookies de sesión.

---

## Resumen de Carpetas
- **public/**: Archivos estáticos (logos, manifest, etc.)
- **src/**: Código fuente principal
  - **modules/auth/**: Autenticación, formularios, hooks y store
  - **modules/dashboard/**: Componentes y lógica del dashboard (saldo, recarga, pagos, historial)
  - **modules/ui/**: Componentes de UI reutilizables y layouts
  - **modules/utils/**: Utilidades y helpers
  - **routes/**: Definición de rutas principales
- **styles.css**: Estilos globales

---

## Principales Dependencias
- **React**: 19.2.0
- **Vite**: 7.1.7
- **@tanstack/react-router**: 1.132.0
- **@tanstack/react-query**: 5.66.5
- **Zustand**: 5.0.10
- **Tailwind CSS**: 4.0.6
- **Lucide React**: 0.544.0
- **Axios**: 1.13.4

---

## Scripts Útiles
```bash
pnpm dev        # Desarrollo con hot reload
pnpm build      # Compila el proyecto
pnpm preview    # Previsualiza el build
pnpm lint       # Linting con ESLint
pnpm format     # Formatea código con Prettier
pnpm check      # Lint + Format
pnpm test       # Ejecuta pruebas unitarias
```

---

## Contribuyendo
1. Crea una rama para tu feature:
   ```bash
   git checkout -b feat/mi-feature
   ```
2. Realiza tus cambios siguiendo buenas prácticas de React y TypeScript.
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
