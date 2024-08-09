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
exports.getPatientsByDni = exports.getPatientsByMaternalSurname = exports.getPatientsByPaternalSurname = exports.getPatientsByName = exports.getPatientsByJob = exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.createPatient = exports.getPatients = void 0;
const patientService_1 = require("../services/patientService");
//Obtener todos los pacientes
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield (0, patientService_1.getPatientsService)();
        console.log("Solicitud recibida en getPatients con pacientes:", patients);
        if (patients.length === 0) {
            res.status(404).json({ message: 'No se encontraron pacientes' });
        }
        else {
            res.status(200).json(patients);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener pacientes' });
    }
});
exports.getPatients = getPatients;
//Crear un nuevo paciente
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = req.body;
    try {
        const newPatient = yield (0, patientService_1.createPatientService)(patient);
        res.status(201).json(newPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear paciente: ' + error.message });
        }
        else {
            res.status(400).json({ message: 'Error al crear paciente' });
        }
    }
});
exports.createPatient = createPatient;
//Obtener un paciente por ID
const getPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Solicitud recibida en getPatientById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const patient = yield (0, patientService_1.getPatientByIdService)(id);
        res.status(200).json(patient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Paciente no encontrado: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    }
});
exports.getPatientById = getPatientById;
//Actualizar un paciente por ID
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const patient = yield (0, patientService_1.updatePatientService)(id, updateData);
        res.status(200).json(patient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Paciente no encontrado: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    }
});
exports.updatePatient = updatePatient;
//Eliminar un paciente por ID
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield (0, patientService_1.deletePatientService)(id);
        res.status(200).json(patient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Paciente no encontrado: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    }
});
exports.deletePatient = deletePatient;
//Obtener pacientes por trabajo
const getPatientsByJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patients = yield (0, patientService_1.getPatientsByJobService)(id);
        res.status(200).json(patients);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
});
exports.getPatientsByJob = getPatientsByJob;
//Obtener pacientes por nombre
const getPatientsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const patients = yield (0, patientService_1.getPatientsByNameService)(name);
        res.status(200).json(patients);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
});
exports.getPatientsByName = getPatientsByName;
//Obtener pacientes por apellido paterno
const getPatientsByPaternalSurname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paternalSurname } = req.params;
    try {
        const patients = yield (0, patientService_1.getPatientsByPaternalSurnameService)(paternalSurname);
        res.status(200).json(patients);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
});
exports.getPatientsByPaternalSurname = getPatientsByPaternalSurname;
//Obtener pacientes por apellido materno
const getPatientsByMaternalSurname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { maternalSurname } = req.params;
    try {
        const patients = yield (0, patientService_1.getPatientsByMaternalSurnameService)(maternalSurname);
        res.status(200).json(patients);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
});
exports.getPatientsByMaternalSurname = getPatientsByMaternalSurname;
//Obtener pacientes por dni
const getPatientsByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const patients = yield (0, patientService_1.getPatientsByDniService)(dni);
        res.status(200).json(patients);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
});
exports.getPatientsByDni = getPatientsByDni;
// fin de la implementacion de los controladores para gestionar los pacientes
