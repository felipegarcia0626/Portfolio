// src/config/db.ts

import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de conexión a SQL Server
const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // true si se usa Azure
    trustServerCertificate: true
  }
};

export const connectDB = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('✅ Conectado a SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ Error conectando a SQL Server:', err);
    throw err;
  }
};
