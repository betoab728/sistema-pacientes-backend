"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// se implementa las rutas para las historias clinicas
const express_1 = require("express");
const clinicalHistoryController_1 = require("../controllers/clinicalHistoryController");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get('/', validarJWT_1.validarJWT, clinicalHistoryController_1.getClinicalHistories);
router.post('/', validarJWT_1.validarJWT, clinicalHistoryController_1.createClinicalHistory);
router.get('/:id', validarJWT_1.validarJWT, clinicalHistoryController_1.getClinicalHistoryById);
router.put('/:id', validarJWT_1.validarJWT, clinicalHistoryController_1.updateClinicalHistory);
router.delete('/:id', validarJWT_1.validarJWT, clinicalHistoryController_1.deleteClinicalHistory);
router.get('/patient/:patientId', validarJWT_1.validarJWT, clinicalHistoryController_1.getClinicalHistoriesByPatientId);
exports.default = router;
