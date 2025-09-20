//aca se eimplementa el modelo de la collecion de doctores segun este estquema:
/* "_id": { "$oid": "unique-id" },
  "name": "Carlos",
  "paternalSurname": "Sánchez",
  "maternalSurname": "Lopez",
  "dateBirth": "1985-08-15",
  "gender": "male",
  "address": "av los pinos 123",
  "email": "carlos.sanchez@example.com",
  "phone": "987654321",
  "medicalSchool": "Colegio Médico del Perú"*/
  import mongoose from 'mongoose';
//definir la interfaz para el modelo de doctor
export interface IDoctor extends mongoose.Document {
    dni: string;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    dateBirth: string;
    gender : string;
    address: string;
    email: string;
    phone: string;
    medicalSchool: string;
    specialtyID: mongoose.Types.ObjectId;
}
//definir el esquema de doctor
const DoctorSchema = new mongoose.Schema<IDoctor>({
    dni: {
        type: String,
        required: true,
        unique: true // Campo único
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
    medicalSchool: {
        type: String,
        required: true
    },
    specialtyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true
    }
} //se considera timestamp para el registro de la fecha de creacion y actualizacion de los registros
, { 
    timestamps: true ,
     collection: 'doctors'

});
//crear el modelo de doctor
export const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);
//fin de la implementacion del modelo de doctor

