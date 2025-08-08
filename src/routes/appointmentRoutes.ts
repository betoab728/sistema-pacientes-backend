//se implementan las rutas para las citas medicas

//importar express
import { Router } from 'express';
//importar los controladores de citas medicas
import { getAppointments, getAppointmentById, createAppointment, updateAppointment, getAppointmentsByDate,updateAppointmentStatus
    ,getAppointmentsReport
  } from '../controllers/appointmentController';

import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

// Protegemos todas las rutas con el middleware validarJWT
router.get('/', validarJWT, getAppointments);
router.post('/', validarJWT, createAppointment);
router.get('/:id', validarJWT, getAppointmentById);
router.put('/:id', validarJWT, updateAppointment);
router.put('/status/:id', validarJWT, updateAppointmentStatus);
router.get('/date/:from/:to', validarJWT, getAppointmentsByDate);
router.get('/report/:from/:to', validarJWT, getAppointmentsReport);


export default router;