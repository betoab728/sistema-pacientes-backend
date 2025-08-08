// se implementa las rutas de la colección de pacientes que se registraran en la base de datos
import { Router } from 'express';
import {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    getPatientsByJob,
    getPatientsByName,
    getPatientsByPaternalSurname,
    getPatientsByMaternalSurname,
    getPatientsByDni
} from '../controllers/patientController';

/**
 * @openapi
 * /pacientes:
 *   get:
 *     summary: Obtiene todos los pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes.
 */

const router = Router();

router.get('/', getPatients);
router.post('/', createPatient);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/job/:jobId', getPatientsByJob);
router.get('/name/:name', getPatientsByName);
router.get('/paternalSurname/:paternalSurname', getPatientsByPaternalSurname);
router.get('/maternalSurname/:maternalSurname', getPatientsByMaternalSurname);
router.get('/dni/:dni', getPatientsByDni);

export default router;
