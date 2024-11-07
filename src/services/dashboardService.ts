
import { DashboardDTO } from '../dtos/dashboardDTO';
import { AppointmentDTO } from '../dtos/appointmentDTO';
import Patient from '../models/patientModel';
import { Doctor } from '../models/doctorModel';
import { Appointment } from '../models/appointmentModel';
import mongoose from 'mongoose';
import { AppointmentsByMonthDTO } from '../dtos/appointmentsByMonthDTO';

export const getDashboardData = async (): Promise<DashboardDTO> =>{
    //consultas para llenar el dashboard
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'scheduled' });
    const totalDoctors = await Doctor.countDocuments();

        // Consulta para las últimas 10 citas médicas
    const lastAppointmentsData  = await Appointment.find()
        .sort({ date: -1, hour: -1 })
        .limit(10)
        .populate('patientID', 'name paternalSurname maternalSurname')
        .populate('doctorID', 'name paternalSurname maternalSurname')
        .lean() as Array<{
            _id: mongoose.Types.ObjectId;
            date: Date;
            hour: string;
            patientID: {
                name: string;
                paternalSurname: string;
                maternalSurname: string;
            };
            doctorID: {
                name: string;
                paternalSurname: string;
                maternalSurname: string;
            };
            office: string;
            status: string;
        }>;
    
    // Consulta para citas por mes
    const appointmentsByMonthData  = await Appointment.aggregate([
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
    const lastAppointments: AppointmentDTO[] = lastAppointmentsData.map((appointment) => ({
        id:(appointment._id as mongoose.Types.ObjectId).toString(),
        date: appointment.date,
        hour: appointment.hour,
        patientName: `${appointment.patientID.name} ${appointment.patientID.paternalSurname} ${appointment.patientID.maternalSurname}`,
        doctorName: `${appointment.doctorID.name} ${appointment.doctorID.paternalSurname} ${appointment.doctorID.maternalSurname}`,
        office: appointment.office,
        status: appointment.status,
    }));

        // Mapeo a AppointmentsByMonthDTO
        const appointmentsByMonth: AppointmentsByMonthDTO[] = appointmentsByMonthData.map(item => ({
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



}