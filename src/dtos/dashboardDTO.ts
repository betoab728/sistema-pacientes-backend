import { AppointmentDTO } from './appointmentDTO';
import { AppointmentsByMonthDTO } from './appointmentsByMonthDTO';

export interface DashboardDTO {
    totalPatients: number;
    totalAppointments: number;
    pendingAppointments: number;
    totalDoctors: number;
    lastAppointments: AppointmentDTO[];
    appointmentsByMonth: AppointmentsByMonthDTO[];
}