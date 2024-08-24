/*se crea el modelo del hisotrial clinico de un paciente*/
import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IClinicalHistory extends Document {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
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
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
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

