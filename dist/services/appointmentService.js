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
exports.getAppointmentsByDateService = exports.deleteAppointmentService = exports.updateAppointmentStatusService = exports.updateAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = void 0;
//se implementa los srvicios para las citas medicas
//importar el modelo de cita medica
const appointmentModel_1 = require("../models/appointmentModel");
//obtener todas las citas medicas de tipo async await y con trycatch
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const appointments = yield appointmentModel_1.Appointment.find({}, '_id date hour office status')
                .populate('patientID', 'name paternalSurname maternalSurname') // Incluye los apellidos del paciente
                .populate('doctorID', 'name paternalSurname maternalSurname'); // Incluye los apellidos del doctor
            return appointments.map(appointment => ({
                _id: appointment._id,
                date: appointment.date,
                hour: appointment.hour,
                patient: appointment.patientID
                    ? `${appointment.patientID.name} ${appointment.patientID.paternalSurname} ${appointment.patientID.maternalSurname}`
                    : 'N/A',
                doctor: appointment.doctorID
                    ? `${appointment.doctorID.name} ${appointment.doctorID.paternalSurname} ${appointment.doctorID.maternalSurname}`
                    : 'N/A',
                office: appointment.office,
                status: appointment.status,
            }));
        }
        catch (error) {
            throw new Error('Error al obtener citas medicas: ' + error.message);
        }
    }
    catch (error) {
        throw new Error('Error al obtener citas médicas: ' + error.message);
    }
});
exports.getAppointmentsService = getAppointmentsService;
//obtener una cita medica por id
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentModel_1.Appointment.findById(id);
        return appointment;
    }
    catch (error) {
        throw new Error('Error al obtener cita medica: ' + error.message);
    }
});
exports.getAppointmentByIdService = getAppointmentByIdService;
//crear una cita medica
const createAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = new appointmentModel_1.Appointment(appointment);
        yield newAppointment.save();
        return newAppointment;
    }
    catch (error) {
        throw new Error('Error al crear cita medica: ' + error.message);
    }
});
exports.createAppointmentService = createAppointmentService;
//actualizar una cita medica por id
const updateAppointmentService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentModel_1.Appointment.findByIdAndUpdate(id, updateData, { new: true });
        return appointment;
    }
    catch (error) {
        throw new Error('Error al actualizar cita medica: ' + error.message);
    }
});
exports.updateAppointmentService = updateAppointmentService;
// se actualiza el estado de la cita medica por id
const updateAppointmentStatusService = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAppointment = yield appointmentModel_1.Appointment.findByIdAndUpdate(id, { status }, // Solo actualiza el campo status
        { new: true });
        return updatedAppointment;
    }
    catch (error) {
        throw new Error('Error al actualizar el estado de la cita: ' + error.message);
    }
});
exports.updateAppointmentStatusService = updateAppointmentStatusService;
//eliminar una cita medica por id
const deleteAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentModel_1.Appointment.findByIdAndDelete(id);
        return appointment;
    }
    catch (error) {
        throw new Error('Error al eliminar cita medica: ' + error.message);
    }
});
exports.deleteAppointmentService = deleteAppointmentService;
// se busca las citas medicas por fecha desde y hasta
const getAppointmentsByDateService = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    // Validar que las fechas sean instancias de Date
    if (!(from instanceof Date) || !(to instanceof Date)) {
        throw new Error('Invalid date parameters');
    }
    // Asegurarse de que 'from' no sea después de 'to'
    if (from > to) {
        throw new Error('The "from" date cannot be after the "to" date');
    }
    try {
        return yield appointmentModel_1.Appointment.find({ date: { $gte: from, $lte: to } });
    }
    catch (error) {
        throw new Error('Error al obtener citas medicas por fecha: ' + error.message);
    }
});
exports.getAppointmentsByDateService = getAppointmentsByDateService;
