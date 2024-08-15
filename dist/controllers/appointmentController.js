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
exports.updateAppointmentStatus = exports.getAppointmentsByDate = exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.createAppointment = exports.getAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
//obtener todas las citas medicas
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAppointmentsService)();
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener citas medicas' });
    }
});
exports.getAppointments = getAppointments;
//crear una nueva cita medica
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = req.body;
    try {
        const newAppointment = yield (0, appointmentService_1.createAppointmentService)(appointment);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear cita medica: ' + error.message });
        }
        else {
            res.status(400).json({ message: 'Error al crear cita medica' });
        }
    }
});
exports.createAppointment = createAppointment;
//obtener una cita medica por ID
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(id);
        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener cita medica' });
    }
});
exports.getAppointmentById = getAppointmentById;
//actualizar una cita medica por ID
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const appointment = yield (0, appointmentService_1.updateAppointmentService)(id, updateData);
        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar cita medica' });
    }
});
exports.updateAppointment = updateAppointment;
//eliminar una cita medica por ID
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield (0, appointmentService_1.deleteAppointmentService)(id);
        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar cita medica' });
    }
});
exports.deleteAppointment = deleteAppointment;
//obtener citas medicas por fecha desde y hasta
const getAppointmentsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.query;
    try {
        const appointments = yield (0, appointmentService_1.getAppointmentsByDateService)(new Date(from), new Date(to));
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener citas medicas' });
    }
});
exports.getAppointmentsByDate = getAppointmentsByDate;
//actualizar el estado de una cita medica por ID
const updateAppointmentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedAppointment = yield (0, appointmentService_1.updateAppointmentStatusService)(id, status);
        if (updatedAppointment) {
            res.status(200).json(updatedAppointment);
        }
        else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado de la cita' });
    }
});
exports.updateAppointmentStatus = updateAppointmentStatus;
//fin de la implementacion del controlador de citas medicas
