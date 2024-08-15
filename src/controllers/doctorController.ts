//aca se implementa el controlador para doctor
import { Request, Response } from 'express';
import { createDoctorService, deleteDoctorService, getDoctorByIdService, getDoctorsService, updateDoctorService,
    getDoctorsByNameService,getDoctorsByDniService } from '../services/doctorService';

//Obtener todos los doctores
export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await getDoctorsService();
        console.log("Solicitud recibida en getDoctors con doctores:", doctors);
        if (doctors.length === 0) {
            res.status(404).json({ message: 'No se encontraron doctores' });
        } else {
            res.status(200).json(doctors);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener doctores' });
    }
};
//Crear un nuevo doctor
export const createDoctor = async (req: Request, res: Response) => {
    const doctor = req.body;
    try {
        const newDoctor = await createDoctorService(doctor);
        res.status(201).json(newDoctor);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear doctor: ' + error.message });
        } else {
            res.status(400).json({ message: 'Error al crear doctor' });
        }
    }
};
//Obtener un doctor por ID
export const getDoctorById = async (req: Request, res: Response) => {
    console.log("Solicitud recibida en getDoctorById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const doctor = await getDoctorByIdService(id);
        res.status(200).json(doctor);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Doctor no encontrado: ' + error.message });
        } else {
            res.status(404).json({ message: 'Doctor no encontrado' });
        }
    }
};
//Actualizar un doctor por ID
export const updateDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const doctor = await updateDoctorService(id, updateData);
        res.status(200).json(doctor);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Doctor no encontrado: ' + error.message });
        } else {
            res.status(404).json({ message: 'Doctor no encontrado' });
        }
    }
};
//Eliminar un doctor por ID
export const deleteDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const doctor = await deleteDoctorService(id);
        res.status(200).json(doctor);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Doctor no encontrado: ' + error.message });
        } else {
            res.status(404).json({ message: 'Doctor no encontrado' });
        }
    }
};
//Obtener doctores por nombre
export const getDoctorsByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
        const doctors = await getDoctorsByNameService(name);
        if (doctors.length === 0) {
            res.status(404).json({ message: 'No se encontraron doctores' });
        } else {
            res.status(200).json(doctors);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener doctores' });
    }
};
//Obtener doctores por dni
export const getDoctorsByDni = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const doctors = await getDoctorsByDniService(dni);
        if (doctors.length === 0) {
            res.status(404).json({ message: 'No se encontraron doctores' });
        } else {
            res.status(200).json(doctors);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener doctores' });
    }
};
//fin de la implementacion de los controladores para doctor

