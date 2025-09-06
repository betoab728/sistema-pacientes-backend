import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController';

const router = Router();
import { validarJWT } from '../middlewares/validarJWT';

router.get('/', validarJWT, getDashboard);

export default router;