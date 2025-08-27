import { Router } from 'express';
import { getAboutProfile } from '../controllers/aboutController';
import { getProjects } from '../controllers/projectsController';
import { getContactInfo, postContactMessage } from '../controllers/contactController';
import { validateContact } from '../middlewares/validateContact';

const router = Router();

router.get('/about', getAboutProfile);
router.get('/projects', getProjects);
router.get('/contact', getContactInfo);
router.post('/contact', validateContact, postContactMessage);

export default router;
