import { Request, Response } from 'express';
import { connectDB } from '../config/db';

/**
    getProjects
    Controlador que ejecuta el procedimiento almacenado spGetProjects y devuelve la información de la tabla tbProjects.
 */
export const getProjects = async (req: Request, res: Response) => {
  try {
    // Conectamos a la base de datos usando la función centralizada connectDB
    const pool = await connectDB();

    // Ejecutamos el procedimiento almacenado
    const result = await pool.request().execute('spGetProjects');

    // Enviamos los datos obtenidos como respuesta en formato JSON
    res.json(result.recordset);
  } catch (error) {
    console.error('Error en getProjects:', error);

    // Si algo falla, devolvemos un error 500 (error interno del servidor)
    res.status(500).json({ error: 'Error al obtener los proyectos.' });
  }
};
