// Importamos dependencias principales
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import Routes from './routes/index';

// Cargamos variables de entorno
dotenv.config();

// Inicializamos Express
const app = express();
app.use(cors()); // Permitir peticiones desde frontend
app.use(express.json()); // Permitir JSON en requests

const PORT = process.env.PORT || 5000;

// Endpoint de prueba para verificar que API y DB funcionan
app.get('/api/health', async (req, res) => {
    try {
      await connectDB(); // Intentamos conectar a SQL Server
      res.json({ status: 'API funcionando correctamente 🚀' });
    } catch (error) {
      console.error('❌ Error en /api/health:', error); // Mostrar detalle en consola
      res.status(500).json({ 
        status: 'Error al conectar con la base de datos ❌',
        error: error instanceof Error ? error.message : String(error) // Devolver mensaje
      });
    }
  });
  
// Registramos el router para /api
app.use('/api', Routes);

// Levantamos servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

