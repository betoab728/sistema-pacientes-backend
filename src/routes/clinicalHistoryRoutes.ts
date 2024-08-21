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

const router = Router();

router.get('/', getClinicalHistories);
router.post('/', createClinicalHistory);
router.get('/:id', getClinicalHistoryById);
router.put('/:id', updateClinicalHistory);
router.delete('/:id', deleteClinicalHistory);
router.get('/patient/:patientId', getClinicalHistoriesByPatientId);

export default router;
