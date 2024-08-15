"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
// se crea el modelo para las citas medicas con los campos:
//importar mongoose
const mongoose_1 = __importDefault(require("mongoose"));
//definir el esquema de cita medica
const AppointmentSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    patientID: {
        //el tipo es objeto id de mongoose
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    office: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'],
        default: 'scheduled'
    }
}, {
    timestamps: true,
    collection: 'appointments' // Especificar el nombre de la colección
});
//crear el modelo de cita medica
exports.Appointment = mongoose_1.default.model('Appointment', AppointmentSchema);
//exportar el modelo de cita medica
