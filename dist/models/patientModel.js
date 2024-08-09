"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//se implementa el modelo de la colección de pacientes que se registraran en la base de datos
const mongoose_1 = __importDefault(require("mongoose"));
//definir el esquema de paciente
const PatientSchema = new mongoose_1.default.Schema({
    dni: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    paternalSurname: {
        type: String,
        required: true
    },
    maternalSurname: {
        type: String,
        required: true
    },
    dateBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    familyHistory: {
        type: String,
        required: true
    },
    allergies: {
        type: String,
        required: true
    },
    job: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }
}, {
    timestamps: true,
    collection: 'patients' // Especificar el nombre de la colección
});
//crear el modelo de paciente
const Patient = mongoose_1.default.model('Patient', PatientSchema);
//exportar el modelo de paciente
exports.default = Patient;
//fin del archivo 
