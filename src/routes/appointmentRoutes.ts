//se implementan las rutas para las citas medicas

//importar express
import { Router } from 'express';
//importar los controladores de citas medicas
import { getAppointments, getAppointmentById, createAppointment, updateAppointment, getAppointmentsByDate,updateAppointmentStatus  } from '../controllers/appointmentController';

const router = Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.put('/status/:id', updateAppointmentStatus);
router.get('/date/:from/:to', getAppointmentsByDate);

export default router;