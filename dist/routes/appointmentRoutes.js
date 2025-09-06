"use strict";
//se implementan las rutas para las citas medicas
Object.defineProperty(exports, "__esModule", { value: true });
//importar express
const express_1 = require("express");
//importar los controladores de citas medicas
const appointmentController_1 = require("../controllers/appointmentController");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
// Protegemos todas las rutas con el middleware validarJWT
router.get('/', validarJWT_1.validarJWT, appointmentController_1.getAppointments);
router.post('/', validarJWT_1.validarJWT, appointmentController_1.createAppointment);
router.get('/:id', validarJWT_1.validarJWT, appointmentController_1.getAppointmentById);
router.put('/:id', validarJWT_1.validarJWT, appointmentController_1.updateAppointment);
router.put('/status/:id', validarJWT_1.validarJWT, appointmentController_1.updateAppointmentStatus);
router.get('/date/:from/:to', validarJWT_1.validarJWT, appointmentController_1.getAppointmentsByDate);
router.get('/report/:from/:to', validarJWT_1.validarJWT, appointmentController_1.getAppointmentsReport);
exports.default = router;
