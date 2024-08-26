"use strict";
//se implementan las rutas para las citas medicas
Object.defineProperty(exports, "__esModule", { value: true });
//importar express
const express_1 = require("express");
//importar los controladores de citas medicas
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
router.get('/', appointmentController_1.getAppointments);
router.post('/', appointmentController_1.createAppointment);
router.get('/:id', appointmentController_1.getAppointmentById);
router.put('/:id', appointmentController_1.updateAppointment);
router.put('/status/:id', appointmentController_1.updateAppointmentStatus);
router.get('/date/:from/:to', appointmentController_1.getAppointmentsByDate);
router.get('/report/:from/:to', appointmentController_1.getAppointmentsReport);
exports.default = router;
