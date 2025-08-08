// se implementa las rutas para las historias clinicas
 import { Router } from 'express';

import {
    createClinicalHistory,
    getClinicalHistories,
    getClinicalHistoryById,
    updateClinicalHistory,
    deleteClinicalHistory,
    getClinicalHistoriesByPatientId
} from '../controllers/clinicalHistoryController';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/', validarJWT, getClinicalHistories);
router.post('/', validarJWT, createClinicalHistory);
router.get('/:id', validarJWT, getClinicalHistoryById);
router.put('/:id', validarJWT, updateClinicalHistory);
router.delete('/:id', validarJWT, deleteClinicalHistory);
router.get('/patient/:patientId', validarJWT, getClinicalHistoriesByPatientId);

export default router;
