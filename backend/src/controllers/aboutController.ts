import { Request, Response } from 'express';
import sql from 'mssql';
import { connectDB } from '../config/db';

/**
    getAbout
    Controlador que ejecuta el procedimiento almacenado spGetAbout y devuelve la información de la tabla tbAbout.
 */
export const getAbout = async (req: Request, res: Response) => {
  try {
    // Conectamos a la base de datos usando la función centralizada connectDB
    const pool = await connectDB();

    // Ejecutamos el procedimiento almacenado
    const result = await pool.request().execute('spGetAbout');

    // Enviamos los datos obtenidos como respuesta en formato JSON
    res.json(result.recordset);
  } catch (error) {
    console.error('❌ Error fetching About data:', error);

    // Si algo falla, devolvemos un error 500 (error interno del servidor)
    res.status(500).json({ error: 'Error fetching About data' });
  }
};
