//se implementas las rutas para los doctores
import { Router } from 'express';
import {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getDoctorsByName,
    getDoctorsByDni
} from '../controllers/doctorController';

const router = Router();
import { validarJWT } from '../middlewares/validarJWT';

router.get('/', validarJWT, getDoctors);
router.post('/', validarJWT, createDoctor);
router.get('/:id', validarJWT, getDoctorById);
router.put('/:id', validarJWT, updateDoctor);
router.delete('/:id', validarJWT, deleteDoctor);
router.get('/name/:name', validarJWT, getDoctorsByName);
router.get('/dni/:dni', validarJWT, getDoctorsByDni);

export default router;