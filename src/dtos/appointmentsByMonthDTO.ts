export interface AppointmentsByMonthDTO {
    month: string; // Ejemplo: "January", "February"
    totalAppointments: number;
    completedAppointments: number;
    pendingAppointments: number;
}