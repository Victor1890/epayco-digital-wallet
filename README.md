# Epayco Digital Wallet

![Epayco Logo](./backend/public/epayco.png)

## Resumen del Proyecto
Epayco Digital Wallet es una solución integral para la gestión de billeteras digitales, diseñada para facilitar transacciones financieras como recargas de saldo, pagos y consultas de historial. Este proyecto incluye dos componentes principales:

- **Backend**: Una API RESTful construida con NestJS y MySQL que gestiona la lógica de negocio, autenticación y persistencia de datos.
- **Frontend**: Una interfaz de usuario moderna y accesible desarrollada con React, Vite y Tailwind CSS, que permite a los usuarios interactuar con el sistema de manera intuitiva.

---

## Tabla de Contenidos
- [Resumen del Proyecto](#resumen-del-proyecto)
- [Componentes del Proyecto](#componentes-del-proyecto)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Cómo Ejecutar el Proyecto con Docker Compose](#cómo-ejecutar-el-proyecto-con-docker-compose)
- [Notas Adicionales](#notas-adicionales)
- [Contribuyendo](#contribuyendo)
- [FAQ y Solución de Problemas](#faq-y-solución-de-problemas)

---

## Componentes del Proyecto

### Backend
El backend proporciona la lógica de negocio y la API RESTful para la gestión de clientes, recargas, pagos y confirmaciones de transacciones. Incluye autenticación basada en tokens y una arquitectura modular.

#### Tecnologías Clave
- **Framework**: [NestJS](https://nestjs.com/)
- **Base de Datos**: [MySQL](https://www.mysql.com/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Validación**: [Class Validator](https://github.com/typestack/class-validator)
- **Autenticación**: JWT

#### Funcionalidades Principales
- Gestión de clientes
- Recarga de saldo
- Pagos y confirmación de transacciones
- Migraciones y seeds para la base de datos

Para más detalles, consulta el archivo [backend/README.md](./backend/README.md).

---

### Frontend
El frontend es una aplicación web que permite a los usuarios interactuar con el sistema de manera intuitiva. Incluye funcionalidades como registro, inicio de sesión, recarga de saldo, pagos y consulta de historial de transacciones.

#### Tecnologías Clave
- **Framework**: [React](https://reactjs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Estado Global**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Ruteo**: [TanStack Router](https://tanstack.com/router)

#### Funcionalidades Principales
- Formularios de autenticación
- Dashboard para la gestión de la billetera
- Integración con la API del backend

Para más detalles, consulta el archivo [frontend/README.md](./frontend/README.md).

---

## Cómo Ejecutar el Proyecto con Docker Compose

### Requisitos Previos
- **Docker**: Asegúrate de tener Docker instalado en tu sistema. Descárgalo desde [Docker](https://www.docker.com/).
- **Docker Compose**: Incluido en las versiones modernas de Docker Desktop.

### Pasos para Levantar el Proyecto
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Victor1890/epayco-digital-walle
   cd epayco-digital-wallet
   ```
2. Copia el archivo de variables de entorno para el backend y el frontend:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
3. Configura las variables de entorno críticas en ambos archivos `.env` (consulta las secciones de variables de entorno en los README de cada componente).
4. Levanta los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```
5. Accede a las aplicaciones:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:4000](http://localhost:4000)

### Comandos Útiles
- Detener los servicios:
  ```bash
  docker-compose down
  ```
- Ver logs de los servicios:
  ```bash
  docker-compose logs -f
  ```
- Reiniciar los servicios:
  ```bash
  docker-compose restart
  ```

---

## Notas Adicionales
- Si necesitas más información sobre cada componente, consulta los archivos README específicos en las carpetas `backend` y `frontend`.
- Asegúrate de que Docker esté corriendo antes de ejecutar los comandos de Docker Compose.

---

## Contribuyendo
¡Gracias por tu interés en contribuir a Epayco Digital Wallet! Sigue estos pasos para colaborar:

1. Crea una rama para tu feature:
   ```bash
   git checkout -b feat/mi-feature
   ```
2. Realiza tus cambios siguiendo las buenas prácticas de desarrollo.
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

---

## FAQ y Solución de Problemas
- **Error: Los contenedores no se levantan correctamente**
  - Asegúrate de que los puertos `3000` y `4000` estén disponibles.
  - Verifica que las variables de entorno en los archivos `.env` estén configuradas correctamente.

- **Error: Docker no está corriendo**
  - Asegúrate de que Docker Desktop esté abierto y funcionando.

- **¿Cómo puedo cambiar los puertos por defecto?**
  - Edita las variables `PORT` en los archivos `.env` de `backend` y `frontend`.
