/*se crea el modelo del hisotrial clinico de un paciente*/
import { Schema, model, Document } from 'mongoose';

export interface IClinicalHistory extends Document {
    patientId: string;
    doctorId: string;
    date: Date;
    hour: string;
    symptoms: string;
    diagnosis: string;
    tests: string;
    treatment: string;
    notes: string;
}

//definir el esquema de cita medica
const ClinicalHistorySchema = new Schema<IClinicalHistory>({
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    tests: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'clinicalHistories' // Especificar el nombre de la colección
});

//crear el modelo de cita medica
export const ClinicalHistory = model<IClinicalHistory>('ClinicalHistory', ClinicalHistorySchema);

