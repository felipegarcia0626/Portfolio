// src/middlewares/validateContact.ts

import { Request, Response, NextFunction } from 'express';

export const validateContact = (req: Request, res: Response, next: NextFunction) => {
  const { ContactName, ContactEmail, ContactMessage } = req.body;

  // Verificar que todos los campos estén presentes
  if ( !ContactName || !ContactEmail || !ContactMessage) {
    return res.status(400).json({ status: '❌ Todos los campos son obligatorios' });
  }
  
  // Validar que el nombre tenga una longitud válida
  if (ContactName.length < 3) {
    return res.status(400).json({ status: '❌ El nombre debe tener una cantidad de caracteres mayor o igual a 3' });
  }

  // Validar formato de email con regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(ContactEmail)) {
    return res.status(400).json({ status: '❌ El correo electrónico no tiene un formato válido' });
  }

  next(); // Si todo está bien, continúa al controlador
};
