"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalHistory = void 0;
/*se crea el modelo del hisotrial clinico de un paciente*/
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
//definir el esquema de cita medica
const ClinicalHistorySchema = new mongoose_1.Schema({
    patientId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    tests: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'clinicalHistories' // Especificar el nombre de la colección
});
//crear el modelo de cita medica
exports.ClinicalHistory = (0, mongoose_1.model)('ClinicalHistory', ClinicalHistorySchema);
