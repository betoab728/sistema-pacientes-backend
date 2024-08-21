"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// se implementa las rutas para las historias clinicas
const express_1 = require("express");
const clinicalHistoryController_1 = require("../controllers/clinicalHistoryController");
const router = (0, express_1.Router)();
router.get('/', clinicalHistoryController_1.getClinicalHistories);
router.post('/', clinicalHistoryController_1.createClinicalHistory);
router.get('/:id', clinicalHistoryController_1.getClinicalHistoryById);
router.put('/:id', clinicalHistoryController_1.updateClinicalHistory);
router.delete('/:id', clinicalHistoryController_1.deleteClinicalHistory);
router.get('/patient/:patientId', clinicalHistoryController_1.getClinicalHistoriesByPatientId);
exports.default = router;
