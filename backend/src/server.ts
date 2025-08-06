// Importamos dependencias principales
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import aboutRoutes from './routes/aboutRoutes';
import projectRoutes from './routes/projectsRoutes'

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
// Levantamos servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

// Registramos el router para /api/about
app.use('/api/about', aboutRoutes);

// Registramos el router para /api/projects. Solo '/api' ya que en el route ya se definió la ruta '/projects'.
app.use('/api', projectRoutes);