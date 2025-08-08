"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//se implementas las rutas para los doctores
const express_1 = require("express");
const doctorController_1 = require("../controllers/doctorController");
const router = (0, express_1.Router)();
const validarJWT_1 = require("../middlewares/validarJWT");
router.get('/', validarJWT_1.validarJWT, doctorController_1.getDoctors);
router.post('/', validarJWT_1.validarJWT, doctorController_1.createDoctor);
router.get('/:id', validarJWT_1.validarJWT, doctorController_1.getDoctorById);
router.put('/:id', validarJWT_1.validarJWT, doctorController_1.updateDoctor);
router.delete('/:id', validarJWT_1.validarJWT, doctorController_1.deleteDoctor);
router.get('/name/:name', validarJWT_1.validarJWT, doctorController_1.getDoctorsByName);
router.get('/dni/:dni', validarJWT_1.validarJWT, doctorController_1.getDoctorsByDni);
exports.default = router;
