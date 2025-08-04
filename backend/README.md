📌 Portfolio Backend (English)
Backend of the professional portfolio developed in Node.js + TypeScript, connected to SQL Server with a dedicated service user and professional architecture.

🚀 Project Status
✅ Iteration 1 completed:

Initial setup with Node.js + TypeScript.

Connection to SQL Server using a dedicated service user (usrPortfolioDB).

/api/health endpoint to verify API and database connection.

📂 Project Structure
src/
├── config/        # Configuration (DB)
├── controllers/   # Business logic (future iterations)
├── routes/        # API routes (future iterations)
├── models/        # Interfaces and types (future iterations)
├── middlewares/   # Validations (future iterations)
└── server.ts      # Entry point
⚙️ Prerequisites
Node.js >= 18

SQL Server (Mixed Mode Authentication enabled)

Service user usrPortfolioDB with minimum permissions (db_datareader, EXECUTE)

📥 Installation
# Clone repository
git clone https://github.com/felipegarcia0626/portfolio-backend.git
cd portfolio-backend

# Install dependencies
npm install
🔧 Configuration
Create a .env file in the root folder:

PORT=5000
DB_USER=usrPortfolioDB
DB_PASSWORD=PasswordExample
DB_SERVER=DESKTOP-K0ISP59
DB_DATABASE=PortfolioDB
▶️ Run in Development
npx ts-node-dev src/server.ts
🔍 Available Endpoint
GET /api/health
Checks that the API and the database are working.

Expected response:
{"status":"API running successfully 🚀"}
📌 Portfolio Backend (Español)
Backend del portafolio profesional desarrollado en Node.js + TypeScript, conectado a SQL Server con usuario de servicio y arquitectura profesional.

🚀 Estado del proyecto
✅ Iteración 1 completada:

Configuración inicial Node.js + TypeScript.

Conexión a SQL Server con usuario de servicio (usrPortfolioDB).

Endpoint /api/health para verificar conexión.

📂 Estructura del proyecto
src/
├── config/        # Configuración (DB)
├── controllers/   # Lógica de negocio (próximas iteraciones)
├── routes/        # Rutas API (próximas iteraciones)
├── models/        # Interfaces y tipos (próximas iteraciones)
├── middlewares/   # Validaciones (próximas iteraciones)
└── server.ts      # Punto de entrada
⚙️ Requisitos previos
Node.js >= 18

SQL Server (modo mixto habilitado)

Usuario de servicio usrPortfolioDB con permisos mínimos (db_datareader, EXECUTE)

📥 Instalación
# Clonar repositorio
git clone https://github.com/felipegarcia0626/portfolio-backend.git
cd portfolio-backend

# Instalar dependencias
npm install
🔧 Configuración
Crear archivo .env en la raíz:

PORT=5000
DB_USER=usrPortfolioDB
DB_PASSWORD=PasswordExample
DB_SERVER=DESKTOP-K0ISP59
DB_DATABASE=PortfolioDB
▶️ Ejecución en desarrollo
npx ts-node-dev src/server.ts
🔍 Endpoint disponible
GET /api/health
Verifica que la API y la base de datos están funcionando.

Respuesta esperada:
{"status":"API funcionando correctamente 🚀"}
