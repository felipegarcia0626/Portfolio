import { Request, Response } from 'express';
import { connectDB } from '../config/db';
import sql from 'mssql';
/**
    insertContact
    Controlador que ejecuta el procedimiento almacenado spinsertContact.
    POST /api/contact
 */
export const postContactMessage = async (req: Request, res: Response) => {
  try {
    const { contactName, contactEmail, contactMessage } = req.body;

    const pool = await connectDB();
    await pool.request()
      .input('ContactName', sql.NVarChar(100), contactName)
      .input('ContactEmail', sql.NVarChar(100), contactEmail)
      .input('ContactMessage', sql.NVarChar(1000), contactMessage)
      .execute('spInsertContact');

    res.status(201).json({ status: 'Mensaje enviado con éxito ✅' });
  } catch (error) {
    console.error('❌ Error insertando contacto:', error);
    res.status(500).json({ status: 'Error al guardar el mensaje de contacto ❌' });
  }
};

/**
    getContact
    Controlador que ejecuta el procedimiento almacenado spGetContactInfo y devuelve la información de la tabla tbContactInfo.
 */
export const getContactInfo = async (_req: Request, res: Response) => {
  try {
    // Conectamos a la base de datos usando la función centralizada connectDB
    const pool = await connectDB();

    // Ejecutamos el procedimiento almacenado
    const result = await pool.request().execute('spGetContactInfo');

     // Fuerza a array
    const rows = Array.isArray(result.recordset) ? result.recordset : [result.recordset];

    // Normaliza el casing y ordena por OrderIndex si existe
    const data = rows
      .map(r => ({
        infoLabel:  r.InfoLabel  ?? r.infoLabel  ?? '',
        infoValue:  r.InfoValue  ?? r.infoValue  ?? '',
        icon:       r.Icon       ?? r.icon       ?? '',
        orderIndex: r.OrderIndex ?? r.orderIndex ?? 0,
      }))
      .sort((a, b) => a.orderIndex - b.orderIndex);

    res.json(data);
    
  } catch (error) {
    console.error('Error en getContact:', error);

    // Si algo falla, devolvemos un error 500 (error interno del servidor)
    res.status(500).json({ error: 'Error al obtener la info de contacto.' });
  }
};
