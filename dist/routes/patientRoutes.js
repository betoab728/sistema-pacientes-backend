"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// se implementa las rutas de la colección de pacientes que se registraran en la base de datos
const express_1 = require("express");
const patientController_1 = require("../controllers/patientController");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
// Rutas específicas primero
router.get('/job/:jobId', validarJWT_1.validarJWT, patientController_1.getPatientsByJob);
router.get('/name/:name', validarJWT_1.validarJWT, patientController_1.getPatientsByName);
router.get('/paternalSurname/:paternalSurname', validarJWT_1.validarJWT, patientController_1.getPatientsByPaternalSurname);
router.get('/maternalSurname/:maternalSurname', validarJWT_1.validarJWT, patientController_1.getPatientsByMaternalSurname);
router.get('/dni/:dni', validarJWT_1.validarJWT, patientController_1.getPatientsByDni);
router.get('/:patientId/appointments', validarJWT_1.validarJWT, patientController_1.getAppointmentsByPatient);
// Ruta genérica al final
router.get('/:id', validarJWT_1.validarJWT, patientController_1.getPatientById);
router.put('/:id', validarJWT_1.validarJWT, patientController_1.updatePatient);
router.delete('/:id', validarJWT_1.validarJWT, patientController_1.deletePatient);
exports.default = router;
