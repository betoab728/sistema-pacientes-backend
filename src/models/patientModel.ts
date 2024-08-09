//se implementa el modelo de la colección de pacientes que se registraran en la base de datos
import mongoose from 'mongoose';
//definir la interfaz para el modelo de paciente
export interface IPatient extends mongoose.Document {
    dni: string;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    dateBirth: string;
    gender : string;
    address: string;
    email: string;
    phone: string;
    familyHistory: string;
    allergies: string;
    job: mongoose.Types.ObjectId;
}
//definir el esquema de paciente
const PatientSchema = new mongoose.Schema<IPatient>({
    dni: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    paternalSurname: {
        type: String,
        required: true
    },
    maternalSurname: {
        type: String,
        required: true
    },
    dateBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    familyHistory: {
        type: String,
        required: true
    },
    allergies: {
        type: String,
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }
}, {
    timestamps: true,
    collection: 'patients' // Especificar el nombre de la colección
});
//crear el modelo de paciente
const Patient = mongoose.model<IPatient>('Patient', PatientSchema);
//exportar el modelo de paciente
export default Patient;
//fin del archivo 