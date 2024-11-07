export interface AppointmentDTO {
    id: string;
    date: Date;
    hour: string;
    patientName: string;
    doctorName: string;
    office: string;
    status: string;
}