"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// se implementa las rutas de la colección de pacientes que se registraran en la base de datos
const express_1 = require("express");
const patientController_1 = require("../controllers/patientController");
const router = (0, express_1.Router)();
router.get('/', patientController_1.getPatients);
router.post('/', patientController_1.createPatient);
router.get('/:id', patientController_1.getPatientById);
router.put('/:id', patientController_1.updatePatient);
router.delete('/:id', patientController_1.deletePatient);
router.get('/job/:jobId', patientController_1.getPatientsByJob);
router.get('/name/:name', patientController_1.getPatientsByName);
router.get('/paternalSurname/:paternalSurname', patientController_1.getPatientsByPaternalSurname);
router.get('/maternalSurname/:maternalSurname', patientController_1.getPatientsByMaternalSurname);
router.get('/dni/:dni', patientController_1.getPatientsByDni);
exports.default = router;
