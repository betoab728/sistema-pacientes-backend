// se crea el modelo para las citas medicas con los campos:
//importar mongoose
import mongoose from 'mongoose';
//definir la interfaz para el modelo de cita medica
export interface IAppointment extends mongoose.Document {
    date: Date;
    hour: string;
    patientID: mongoose.Types.ObjectId;
    doctorID: mongoose.Types.ObjectId;
    office: string;
    notes: string;
    status: string;
}
//definir el esquema de cita medica
const AppointmentSchema = new mongoose.Schema<IAppointment>({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
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
export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
//exportar el modelo de cita medica