//se implementa los servicios de doctor
import { Doctor } from '../models/doctorModel';
import { IDoctor } from '../models/doctorModel';

//obtener todos los doctores de tipo async await y con trycatch

export const getDoctorsService = async () => {
    try {
        const doctors = await Doctor.find();
        return doctors;
    } catch (error) {
        throw new Error('Error al obtener pacientes: ' + (error as Error).message);
    }
};

//obtener un doctor por id
export const getDoctorByIdService = async (id: string) => {
    try {
        const doctor = await Doctor.findById(id);
        return doctor;
    } catch (error) {
        throw new Error('Error al obtener doctor: ' + (error as Error).message);
    }
};

//crear un doctor
export const createDoctorService = async (doctor: IDoctor) => {
    try {
        //se valida que el dni no se repita
        const doctorExist = await Doctor.findOne({ dni: doctor.dni });
        if (doctorExist) {
            throw new Error('El doctor ya existe');
            
        }

        const newDoctor = new Doctor(doctor);
        await newDoctor.save();
        return newDoctor;
    } catch (error) {
        throw new Error('Error al crear doctor: ' + (error as Error).message);
    }
};

//actualizar un doctor por id
export const updateDoctorService = async (id: string, updateData: Partial<IDoctor>) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
        return doctor;
    } catch (error) {
        throw new Error('Error al actualizar doctor: ' + (error as Error).message);
    }
}

//eliminar un doctor por id
export const deleteDoctorService = async (id: string) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(id);
        return doctor;
    } catch (error) {
        throw new Error('Error al eliminar doctor: ' + (error as Error).message);
    }
}
//se incluye busqueda de doctores por nombre
export const getDoctorsByNameService = async (name: string) => {
    try {
        return await Doctor.find({ name: name });
    } catch (error) {
        throw new Error('Error al obtener doctores por nombre: ' + (error as Error).message);
    }
}
//se incluye busqueda de doctores por dni
export const getDoctorsByDniService = async (dni: string) => {
    try {
        return await Doctor.find({ dni: dni });
    } catch (error) {
        throw new Error('Error al obtener doctores por dni: ' + (error as Error).message);
    }
}
//fin de la implementacion de los servicios de doctor
