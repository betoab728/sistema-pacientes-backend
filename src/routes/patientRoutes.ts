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
import { validarJWT } from '../middlewares/validarJWT';


const router = Router();

router.get('/', validarJWT, getPatients);
router.post('/', validarJWT, createPatient);
router.get('/:id', validarJWT, getPatientById);
router.put('/:id', validarJWT, updatePatient);
router.delete('/:id', validarJWT, deletePatient);
router.get('/job/:jobId', validarJWT, getPatientsByJob);
router.get('/name/:name', validarJWT, getPatientsByName);
router.get('/paternalSurname/:paternalSurname', validarJWT, getPatientsByPaternalSurname);
router.get('/maternalSurname/:maternalSurname', validarJWT, getPatientsByMaternalSurname);
router.get('/dni/:dni', validarJWT, getPatientsByDni);

export default router;
