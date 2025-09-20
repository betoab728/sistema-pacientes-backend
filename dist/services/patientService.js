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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsByPatientService = exports.getPatientsByDniService = exports.getPatientsByMaternalSurnameService = exports.getPatientsByPaternalSurnameService = exports.getPatientsByNameService = exports.getPatientsByJobService = exports.deletePatientService = exports.updatePatientService = exports.getPatientByIdService = exports.createPatientService = exports.getPatientsService = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
const appointmentModel_1 = require("../models/appointmentModel");
//Obtener todos los pacientes
const getPatientsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientModel_1.default.find();
    }
    catch (error) {
        throw new Error('Error al obtener pacientes: ' + error.message);
    }
});
exports.getPatientsService = getPatientsService;
//Crear un nuevo paciente se toma en cuenta que job es un objeto de tipo mongoose.Types.ObjectId y no un string con referencia al modelo job
const createPatientService = (patient) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientExists = yield patientModel_1.default.findOne({ dni: patient.dni });
        if (patientExists) {
            throw new Error('El paciente ya existe');
        }
        const newPatient = new patientModel_1.default({
            dni: patient.dni,
            name: patient.name,
            paternalSurname: patient.paternalSurname,
            maternalSurname: patient.maternalSurname,
            dateBirth: patient.dateBirth,
            gender: patient.gender,
            address: patient.address,
            email: patient.email,
            phone: patient.phone,
            familyHistory: patient.familyHistory,
            allergies: patient.allergies,
            job: patient.job
        });
        yield newPatient.save();
        return {
            dni: newPatient.dni,
            name: newPatient.name
        };
    }
    catch (error) {
        throw new Error('Error al crear paciente: ' + error.message);
    }
});
exports.createPatientService = createPatientService;
//Obtener un paciente por ID
const getPatientByIdService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientModel_1.default.findById(patientId);
        if (!patient) {
            throw new Error('Paciente no encontrado');
        }
        return patient;
    }
    catch (error) {
        throw new Error('Error al obtener paciente por ID: ' + error.message);
    }
});
exports.getPatientByIdService = getPatientByIdService;
//Actualizar un paciente
const updatePatientService = (patientId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientModel_1.default.findByIdAndUpdate(patientId, updateData, { new: true });
        if (!patient) {
            throw new Error('Paciente no encontrado');
        }
        return patient;
    }
    catch (error) {
        throw new Error('Error al actualizar paciente: ' + error.message);
    }
});
exports.updatePatientService = updatePatientService;
//Eliminar un paciente
const deletePatientService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientModel_1.default
            .findByIdAndDelete(patientId);
        if (!patient) {
            throw new Error('Paciente no encontrado');
        }
        return patient;
    }
    catch (error) {
        throw new Error('Error al eliminar paciente: ' + error.message);
    }
});
exports.deletePatientService = deletePatientService;
//Obtener pacientes por trabajo
const getPatientsByJobService = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientModel_1.default.find({ job: jobId });
    }
    catch (error) {
        throw new Error('Error al obtener pacientes por trabajo: ' + error.message);
    }
});
exports.getPatientsByJobService = getPatientsByJobService;
// se incluye busqueda de pacientes por nombre
const getPatientsByNameService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientModel_1.default.find({ name: name });
    }
    catch (error) {
        throw new Error('Error al obtener pacientes por nombre: ' + error.message);
    }
});
exports.getPatientsByNameService = getPatientsByNameService;
// se incluye busqueda de pacientes por apellido paterno
const getPatientsByPaternalSurnameService = (paternalSurname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientModel_1.default.find({ paternalSurname: paternalSurname });
    }
    catch (error) {
        throw new Error('Error al obtener pacientes por apellido paterno: ' + error.message);
    }
});
exports.getPatientsByPaternalSurnameService = getPatientsByPaternalSurnameService;
// se incluye busqueda de pacientes por apellido materno
const getPatientsByMaternalSurnameService = (maternalSurname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientModel_1.default.find({ maternalSurname: maternalSurname });
    }
    catch (error) {
        throw new Error('Error al obtener pacientes por apellido materno: ' + error.message);
    }
});
exports.getPatientsByMaternalSurnameService = getPatientsByMaternalSurnameService;
// se incluye busqueda de pacientes por dni
const getPatientsByDniService = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientModel_1.default.find({ dni: dni });
    }
    catch (error) {
        throw new Error('Error al obtener pacientes por dni: ' + error.message);
    }
});
exports.getPatientsByDniService = getPatientsByDniService;
//Listar las citas medicas por paciente
// Listar las citas médicas por paciente
const getAppointmentsByPatientService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointmentModel_1.Appointment.find({ patientID: patientId })
            .populate('patientID', 'name paternalSurname maternalSurname')
            .populate({
            path: 'doctorID',
            select: 'name paternalSurname maternalSurname specialtyID',
            populate: {
                path: 'specialtyID',
                select: 'specialty'
            }
        });
        return appointments.map(appointment => {
            var _a;
            const patient = appointment.patientID;
            const doctor = appointment.doctorID;
            // Formato de fecha "dd/MM/yyyy"
            const fechaFormateada = new Date(appointment.date).toLocaleDateString('es-PE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            return {
                id: appointment._id, // 👈 cambiado de _id → id
                fecha: fechaFormateada,
                hora: appointment.hour,
                paciente: patient
                    ? `${patient.name} ${patient.paternalSurname} ${patient.maternalSurname}`
                    : 'N/A',
                doctor: doctor
                    ? `${doctor.name} ${doctor.paternalSurname} ${doctor.maternalSurname}`
                    : 'N/A',
                consultorio: appointment.office,
                estado: appointment.status,
                especialidad: ((_a = doctor === null || doctor === void 0 ? void 0 : doctor.specialtyID) === null || _a === void 0 ? void 0 : _a.specialty) || 'N/A'
            };
        });
    }
    catch (error) {
        throw new Error('Error al obtener citas médicas por paciente: ' + error.message);
    }
});
exports.getAppointmentsByPatientService = getAppointmentsByPatientService;
// fin de la implementacion de los servicios para gestionar los pacientes
