"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//se implementas las rutas para los doctores
const express_1 = require("express");
const doctorController_1 = require("../controllers/doctorController");
const router = (0, express_1.Router)();
router.get('/', doctorController_1.getDoctors);
router.post('/', doctorController_1.createDoctor);
router.get('/:id', doctorController_1.getDoctorById);
router.put('/:id', doctorController_1.updateDoctor);
router.delete('/:id', doctorController_1.deleteDoctor);
router.get('/name/:name', doctorController_1.getDoctorsByName);
router.get('/dni/:dni', doctorController_1.getDoctorsByDni);
exports.default = router;
