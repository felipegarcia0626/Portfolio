import { Router } from 'express';
import { getContact, insertContact } from '../controllers/contactController';
import {validateContact} from '../middlewares/validateContact'

// Creamos un router de Express
const router = Router();

/**
 * Ruta POST /api/contact
 * Llama al controlador insertContact para guardar info de contacto de los usuarios
 */
router.post('/contact', validateContact, insertContact);

/**
 * Ruta GET /api/contact
 * Llama al controlador getContact para devolver info de contacto
 */
router.get('/contact', getContact);

export default router;