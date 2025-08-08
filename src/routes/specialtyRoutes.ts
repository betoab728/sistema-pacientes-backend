import express from 'express';
import { getSpecialties } from '../controllers/specialtiesController';

const router = express.Router();
    import { validarJWT } from '../middlewares/validarJWT';

router.get('/', validarJWT, getSpecialties);

export default router;
