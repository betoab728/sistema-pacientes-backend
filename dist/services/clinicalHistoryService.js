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
exports.getClinicalHistoriesByPatientIdService = exports.deleteClinicalHistoryService = exports.updateClinicalHistoryService = exports.createClinicalHistoryService = exports.getClinicalHistoryByIdService = exports.getClinicalHistoriesService = void 0;
//se eimplementan los servicios para la historia clinica
//importar el modelo de historia clinica
const clinicalHistoryModel_1 = require("../models/clinicalHistoryModel");
//obtener todas las historias clinicas de tipo async await y con trycatch
const getClinicalHistoriesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicalHistories = yield clinicalHistoryModel_1.ClinicalHistory.find();
        return clinicalHistories;
    }
    catch (error) {
        throw new Error('Error al obtener historias clinicas: ' + error.message);
    }
});
exports.getClinicalHistoriesService = getClinicalHistoriesService;
//obtener una historia clinica por id
const getClinicalHistoryByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicalHistory = yield clinicalHistoryModel_1.ClinicalHistory.findById(id);
        return clinicalHistory;
    }
    catch (error) {
        throw new Error('Error al obtener historia clinica: ' + error.message);
    }
});
exports.getClinicalHistoryByIdService = getClinicalHistoryByIdService;
//crear una historia clinica
const createClinicalHistoryService = (clinicalHistory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClinicalHistory = new clinicalHistoryModel_1.ClinicalHistory(clinicalHistory);
        yield newClinicalHistory.save();
        return newClinicalHistory;
    }
    catch (error) {
        throw new Error('Error al crear historia clinica: ' + error.message);
    }
});
exports.createClinicalHistoryService = createClinicalHistoryService;
//actualizar una historia clinica por id
const updateClinicalHistoryService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicalHistory = yield clinicalHistoryModel_1.ClinicalHistory.findByIdAndUpdate(id, updateData, { new: true });
        return clinicalHistory;
    }
    catch (error) {
        throw new Error('Error al actualizar historia clinica: ' + error.message);
    }
});
exports.updateClinicalHistoryService = updateClinicalHistoryService;
//eliminar una historia clinica por id
const deleteClinicalHistoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicalHistory = yield clinicalHistoryModel_1.ClinicalHistory.findByIdAndDelete(id);
        return clinicalHistory;
    }
    catch (error) {
        throw new Error('Error al eliminar historia clinica: ' + error.message);
    }
});
exports.deleteClinicalHistoryService = deleteClinicalHistoryService;
//listar las historias clinicas de un paciente por id y ordenarlas por fecha de creacion descendente
const getClinicalHistoriesByPatientIdService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicalHistories = yield clinicalHistoryModel_1.ClinicalHistory.find({ patientId }).sort({ createdAt: -1 });
        return clinicalHistories;
    }
    catch (error) {
        throw new Error('Error al obtener historias clinicas: ' + error.message);
    }
});
exports.getClinicalHistoriesByPatientIdService = getClinicalHistoriesByPatientIdService;
//fin de la implementacion de los servicios para gestionar las historias clinicas
