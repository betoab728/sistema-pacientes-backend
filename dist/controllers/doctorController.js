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
exports.getDoctorsByDni = exports.getDoctorsByName = exports.deleteDoctor = exports.updateDoctor = exports.getDoctorById = exports.createDoctor = exports.getDoctors = void 0;
const doctorService_1 = require("../services/doctorService");
//Obtener todos los doctores
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield (0, doctorService_1.getDoctorsService)();
        console.log("Solicitud recibida en getDoctors con doctores:", doctors);
        if (doctors.length === 0) {
            res.status(404).json({ message: 'No se encontraron doctores' });
        }
        else {
            res.status(200).json(doctors);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener doctores' });
    }
});
exports.getDoctors = getDoctors;
//Crear un nuevo doctor
const createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = req.body;
    try {
        const newDoctor = yield (0, doctorService_1.createDoctorService)(doctor);
        res.status(201).json(newDoctor);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear doctor: ' + error.message });
        }
        else {
            res.status(400).json({ message: 'Error al crear doctor' });
        }
    }
});
exports.createDoctor = createDoctor;
//Obtener un doctor por ID
const getDoctorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Solicitud recibida en getDoctorById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const doctor = yield (0, doctorService_1.getDoctorByIdService)(id);
        res.status(200).json(doctor);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Doctor no encontrado: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Doctor no encontrado' });
        }
    }
});
exports.getDoctorById = getDoctorById;
//Actualizar un doctor por ID
const updateDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const doctor = yield (0, doctorService_1.updateDoctorService)(id, updateData);
        res.status(200).json(doctor);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Doctor no encontrado: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Doctor no encontrado' });
        }
    }
});
exports.updateDoctor = updateDoctor;
//Eliminar un doctor por ID
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const doctor = yield (0, doctorService_1.deleteDoctorService)(id);
        res.status(200).json(doctor);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Doctor no encontrado: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Doctor no encontrado' });
        }
    }
});
exports.deleteDoctor = deleteDoctor;
//Obtener doctores por nombre
const getDoctorsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const doctors = yield (0, doctorService_1.getDoctorsByNameService)(name);
        if (doctors.length === 0) {
            res.status(404).json({ message: 'No se encontraron doctores' });
        }
        else {
            res.status(200).json(doctors);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener doctores' });
    }
});
exports.getDoctorsByName = getDoctorsByName;
//Obtener doctores por dni
const getDoctorsByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const doctors = yield (0, doctorService_1.getDoctorsByDniService)(dni);
        if (doctors.length === 0) {
            res.status(404).json({ message: 'No se encontraron doctores' });
        }
        else {
            res.status(200).json(doctors);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener doctores' });
    }
});
exports.getDoctorsByDni = getDoctorsByDni;
//fin de la implementacion de los controladores para doctor
