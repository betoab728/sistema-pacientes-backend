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

router.get('/', getDoctors);
router.post('/', createDoctor);
router.get('/:id', getDoctorById);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);
router.get('/name/:name', getDoctorsByName);
router.get('/dni/:dni', getDoctorsByDni);

export default router;