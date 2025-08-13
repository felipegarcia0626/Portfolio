# 📌 Portfolio Backend — English

Backend of the professional portfolio developed in Node.js + TypeScript, connected to SQL Server with a dedicated service user and professional architecture.

## 🚀 Current Status
✅ Iteration 2 completed:
- Iteration 1: Backend setup (Node + TypeScript), connection to SQL Server (usrPortfolioDB), /api/health
- Iteration 2: About module (spGetAbout + /api/about)
- Iteration 3: Projects module (spGetProjects + /api/projects)
- Iteration 4: Contact module (spInsertContact + spGetContactInfo + /api/contact + /middleware/validateContact)
- Iteration 5.1: Restructuring

## 📂 Project Structure
src/
├── config/        # Configuration (DB)
├── controllers/   # Business logic
├── routes/        # API routes
├── models/        # Interfaces and types (future iterations)
├── middlewares/   # Validations (future iterations)
└── server.ts      # Entry point

## 📌 Available Endpoints
- GET /api/health → Checks API + DB connection
- GET /api/about  → Returns About data from spGetAbout
- GET /api/projects → Returns About data from spGetProjects
- POST /api/contact → Inserts contact data from spInsertContact
- GET /api/contact → Returns contact data from spGetContactInfo

## 📌 Available Middlewares
- validateContact → Validates if the contact input data is valid
---

# 📌 Portfolio Backend — Español

Backend del portafolio profesional desarrollado en Node.js + TypeScript, conectado a SQL Server con usuario de servicio y arquitectura profesional.

## 🚀 Estado del proyecto
✅ Iteración 2 completada:
- Iteración 1: Configuración backend (Node + TypeScript), conexión a SQL Server (usrPortfolioDB), /api/health
- Iteración 2: Módulo About (spGetAbout + /api/about)
- Iteración 3: Módulo Projects (spGetProjects + /api/projects)
- Iteración 4: Módulo Contact (spInsertContact + spGetContactInfo + /api/contact + /middleware/validateContact)
- Iteración 5.1: Reestructuración.

## 📂 Estructura del proyecto
src/
├── config/        # Configuración (DB)
├── controllers/   # Lógica de negocio
├── routes/        # Rutas API
├── models/        # Interfaces y tipos (próximas iteraciones)
├── middlewares/   # Validaciones (próximas iteraciones)
└── server.ts      # Punto de entrada

## 📌 Endpoints disponibles
- GET /api/health → Verifica API + conexión BD
- GET /api/about  → Devuelve datos de About desde spGetAbout
- GET /api/projects → Devuelve datos de About desde spGetProjects
- POST /api/contact → Inserta datos de contacto desde spInsertContact
- GET /api/contact → Devuelve datos de contacto desde spGetContactInfo

## 📌 Available Middlewares
- validateContact → Valida si la info de contacto es válida