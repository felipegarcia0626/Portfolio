import { Router } from 'express';
import { getAbout } from '../controllers/aboutController';

// Creamos un router de Express
const router = Router();

/**
 * Ruta GET /api/about
 * Llama al controlador getAbout para devolver datos del About Me
 */
router.get('/', getAbout);

export default router;