import { Router } from 'express';
import { getProjects } from '../controllers/projectsController';

// Creamos un router de Express
const router = Router();

/**
 * Ruta GET /api/Projects
 * Llama al controlador getProjects para devolver datos de Projects
 */
router.get('/projects', getProjects);

export default router;