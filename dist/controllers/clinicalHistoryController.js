"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClinicalHistoriesByPatientId = exports.deleteClinicalHistory = exports.updateClinicalHistory = exports.getClinicalHistoryById = exports.createClinicalHistory = exports.getClinicalHistories = void 0;
const clinicalHistoryService_1 = require("../services/clinicalHistoryService");
//Obtener todas las historias clinicas
const getClinicalHistories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicalHistories = yield (0, clinicalHistoryService_1.getClinicalHistoriesService)();
        console.log("Solicitud recibida en getClinicalHistories con historias clinicas:", clinicalHistories);
        if (clinicalHistories.length === 0) {
            res.status(404).json({ message: 'No se encontraron historias clinicas' });
        }
        else {
            res.status(200).json(clinicalHistories);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener historias clinicas' });
    }
});
exports.getClinicalHistories = getClinicalHistories;
//Crear una nueva historia clinica
const createClinicalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clinicalHistory = req.body;
    try {
        const newClinicalHistory = yield (0, clinicalHistoryService_1.createClinicalHistoryService)(clinicalHistory);
        res.status(201).json(newClinicalHistory);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear historia clinica: ' + error.message });
        }
        else {
            res.status(400).json({ message: 'Error al crear historia clinica' });
        }
    }
});
exports.createClinicalHistory = createClinicalHistory;
//Obtener una historia clinica por ID
const getClinicalHistoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Solicitud recibida en getClinicalHistoryById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const clinicalHistory = yield (0, clinicalHistoryService_1.getClinicalHistoryByIdService)(id);
        res.status(200).json(clinicalHistory);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Historia clinica no encontrada: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Historia clinica no encontrada' });
        }
    }
});
exports.getClinicalHistoryById = getClinicalHistoryById;
//Actualizar una historia clinica por ID
const updateClinicalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const clinicalHistory = yield (0, clinicalHistoryService_1.updateClinicalHistoryService)(id, updateData);
        res.status(200).json(clinicalHistory);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Historia clinica no encontrada: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Historia clinica no encontrada' });
        }
    }
});
exports.updateClinicalHistory = updateClinicalHistory;
//Eliminar una historia clinica por ID
const deleteClinicalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const clinicalHistory = yield (0, clinicalHistoryService_1.deleteClinicalHistoryService)(id);
        res.status(200).json(clinicalHistory);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar historia clinica' });
    }
});
exports.deleteClinicalHistory = deleteClinicalHistory;
//Listar las historias clinicas de un paciente por ID y ordenarlas por fecha de creacion descendente
const getClinicalHistoriesByPatientId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    try {
        const clinicalHistories = yield (0, clinicalHistoryService_1.getClinicalHistoriesByPatientIdService)(patientId);
        if (clinicalHistories.length === 0) {
            res.status(404).json({ message: 'No se encontraron historias clinicas' });
        }
        else {
            res.status(200).json(clinicalHistories);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener historias clinicas' });
    }
});
exports.getClinicalHistoriesByPatientId = getClinicalHistoriesByPatientId;
//fin de la implementacion del controlador para las historias clinicas
