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
exports.getDashboardData = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
const doctorModel_1 = require("../models/doctorModel");
const appointmentModel_1 = require("../models/appointmentModel");
const getDashboardData = () => __awaiter(void 0, void 0, void 0, function* () {
    //consultas para llenar el dashboard
    const totalPatients = yield patientModel_1.default.countDocuments();
    const totalAppointments = yield appointmentModel_1.Appointment.countDocuments();
    const pendingAppointments = yield appointmentModel_1.Appointment.countDocuments({ status: 'scheduled' });
    const totalDoctors = yield doctorModel_1.Doctor.countDocuments();
    // Consulta para las últimas 10 citas médicas
    const lastAppointmentsData = yield appointmentModel_1.Appointment.find()
        .sort({ date: -1, hour: -1 })
        .limit(10)
        .populate('patientID', 'name paternalSurname maternalSurname')
        .populate('doctorID', 'name paternalSurname maternalSurname')
        .lean();
    // Consulta para citas por mes
    const appointmentsByMonthData = yield appointmentModel_1.Appointment.aggregate([
        {
            $group: {
                _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                totalAppointments: { $sum: 1 },
                completedAppointments: {
                    $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                },
                pendingAppointments: {
                    $sum: { $cond: [{ $eq: ["$status", "scheduled"] }, 1, 0] }
                }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    // Mapear los datos al formato de DTO
    const lastAppointments = lastAppointmentsData.map((appointment) => ({
        id: appointment._id.toString(),
        date: appointment.date,
        hour: appointment.hour,
        patientName: `${appointment.patientID.name} ${appointment.patientID.paternalSurname} ${appointment.patientID.maternalSurname}`,
        doctorName: `${appointment.doctorID.name} ${appointment.doctorID.paternalSurname} ${appointment.doctorID.maternalSurname}`,
        office: appointment.office,
        status: appointment.status,
    }));
    // Mapeo a AppointmentsByMonthDTO
    const appointmentsByMonth = appointmentsByMonthData.map(item => ({
        month: new Date(0, item._id.month - 1).toLocaleString('default', { month: 'long' }),
        totalAppointments: item.totalAppointments,
        completedAppointments: item.completedAppointments,
        pendingAppointments: item.pendingAppointments
    }));
    // Retornar el DashboardDTO con todos los datos
    return {
        totalPatients,
        totalAppointments,
        pendingAppointments,
        totalDoctors,
        lastAppointments,
        appointmentsByMonth
    };
});
exports.getDashboardData = getDashboardData;
