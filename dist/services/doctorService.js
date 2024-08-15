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
exports.getDoctorsByDniService = exports.getDoctorsByNameService = exports.deleteDoctorService = exports.updateDoctorService = exports.createDoctorService = exports.getDoctorByIdService = exports.getDoctorsService = void 0;
//se implementa los servicios de doctor
const doctorModel_1 = require("../models/doctorModel");
//obtener todos los doctores de tipo async await y con trycatch
const getDoctorsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctorModel_1.Doctor.find();
        return doctors;
    }
    catch (error) {
        throw new Error('Error al obtener pacientes: ' + error.message);
    }
});
exports.getDoctorsService = getDoctorsService;
//obtener un doctor por id
const getDoctorByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield doctorModel_1.Doctor.findById(id);
        return doctor;
    }
    catch (error) {
        throw new Error('Error al obtener doctor: ' + error.message);
    }
});
exports.getDoctorByIdService = getDoctorByIdService;
//crear un doctor
const createDoctorService = (doctor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //se valida que el dni no se repita
        const doctorExist = yield doctorModel_1.Doctor.findOne({ dni: doctor.dni });
        if (doctorExist) {
            throw new Error('El doctor ya existe');
        }
        const newDoctor = new doctorModel_1.Doctor(doctor);
        yield newDoctor.save();
        return newDoctor;
    }
    catch (error) {
        throw new Error('Error al crear doctor: ' + error.message);
    }
});
exports.createDoctorService = createDoctorService;
//actualizar un doctor por id
const updateDoctorService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield doctorModel_1.Doctor.findByIdAndUpdate(id, updateData, { new: true });
        return doctor;
    }
    catch (error) {
        throw new Error('Error al actualizar doctor: ' + error.message);
    }
});
exports.updateDoctorService = updateDoctorService;
//eliminar un doctor por id
const deleteDoctorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield doctorModel_1.Doctor.findByIdAndDelete(id);
        return doctor;
    }
    catch (error) {
        throw new Error('Error al eliminar doctor: ' + error.message);
    }
});
exports.deleteDoctorService = deleteDoctorService;
//se incluye busqueda de doctores por nombre
const getDoctorsByNameService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield doctorModel_1.Doctor.find({ name: name });
    }
    catch (error) {
        throw new Error('Error al obtener doctores por nombre: ' + error.message);
    }
});
exports.getDoctorsByNameService = getDoctorsByNameService;
//se incluye busqueda de doctores por dni
const getDoctorsByDniService = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield doctorModel_1.Doctor.find({ dni: dni });
    }
    catch (error) {
        throw new Error('Error al obtener doctores por dni: ' + error.message);
    }
});
exports.getDoctorsByDniService = getDoctorsByDniService;
//fin de la implementacion de los servicios de doctor
