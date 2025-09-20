"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
//aca se eimplementa el modelo de la collecion de doctores segun este estquema:
/* "_id": { "$oid": "unique-id" },
  "name": "Carlos",
  "paternalSurname": "Sánchez",
  "maternalSurname": "Lopez",
  "dateBirth": "1985-08-15",
  "gender": "male",
  "address": "av los pinos 123",
  "email": "carlos.sanchez@example.com",
  "phone": "987654321",
  "medicalSchool": "Colegio Médico del Perú"*/
const mongoose_1 = __importDefault(require("mongoose"));
//definir el esquema de doctor
const DoctorSchema = new mongoose_1.default.Schema({
    dni: {
        type: String,
        required: true,
        unique: true // Campo único
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
    medicalSchool: {
        type: String,
        required: true
    },
    specialtyID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    }
} //se considera timestamp para el registro de la fecha de creacion y actualizacion de los registros
, {
    timestamps: true,
    collection: 'doctors'
});
//crear el modelo de doctor
exports.Doctor = mongoose_1.default.model('Doctor', DoctorSchema);
//fin de la implementacion del modelo de doctor
