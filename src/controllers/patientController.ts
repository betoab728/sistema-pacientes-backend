// este es el controlador para la colección de pacientes que se registraran en la base de datos
 import { Request, Response } from 'express';
 import { createPatientService, getPatientsService, getPatientByIdService, updatePatientService
    , deletePatientService,
    getPatientsByJobService,
    getPatientsByNameService,
    getPatientsByPaternalSurnameService,
    getPatientsByMaternalSurnameService,
    getPatientsByDniService,
    getAppointmentsByPatientService
  } from '../services/patientService';
//Obtener todos los pacientes
export const getPatients = async (req: Request, res: Response) => {
    try {
        const patients = await getPatientsService();
        console.log("Solicitud recibida en getPatients con pacientes:", patients);
        if (patients.length === 0) {
            res.status(404).json({ message: 'No se encontraron pacientes' });
        } else {
            res.status(200).json(patients);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pacientes' });
    }
};
//Crear un nuevo paciente
export const createPatient = async (req: Request, res: Response) => {
    const patient = req.body;
    try {
        const newPatient = await createPatientService(patient);
        res.status(201).json(newPatient);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear paciente: ' + error.message });
        } else {
            res.status(400).json({ message: 'Error al crear paciente' });
        }
    }
};
//Obtener un paciente por ID
export const getPatientById = async (req: Request, res: Response) => {
    console.log("Solicitud recibida en getPatientById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const patient = await getPatientByIdService(id);
        res.status(200).json(patient);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Paciente no encontrado: ' + error.message });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    }
};
//Actualizar un paciente por ID
export const updatePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const patient = await updatePatientService(id, updateData);
        res.status(200).json(patient);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Paciente no encontrado: ' + error.message });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    }
};
//Eliminar un paciente por ID

export const deletePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const patient = await deletePatientService(id);
        res.status(200).json(patient);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Paciente no encontrado: ' + error.message });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    }
};
//Obtener pacientes por trabajo
export const getPatientsByJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const patients = await getPatientsByJobService(id);
        res.status(200).json(patients);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        } else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
};
//Obtener pacientes por nombre
export const getPatientsByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
        const patients = await getPatientsByNameService(name);
        res.status(200).json(patients);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        } else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
};
//Obtener pacientes por apellido paterno
export const getPatientsByPaternalSurname = async (req: Request, res: Response) => {
    const { paternalSurname } = req.params;
    try {
        const patients = await getPatientsByPaternalSurnameService(paternalSurname);
        res.status(200).json(patients);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        } else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
};
//Obtener pacientes por apellido materno
export const getPatientsByMaternalSurname = async (req: Request, res: Response) => {
    const { maternalSurname } = req.params;
    try {
        const patients = await getPatientsByMaternalSurnameService(maternalSurname);
        res.status(200).json(patients);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        } else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
};
//Obtener pacientes por dni
export const getPatientsByDni = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const patients = await getPatientsByDniService(dni);
        res.status(200).json(patients);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Pacientes no encontrados: ' + error.message });
        } else {
            res.status(404).json({ message: 'Pacientes no encontrados' });
        }
    }
};

// Obtener citas médicas por paciente
export const getAppointmentsByPatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;
        const appointments = await getAppointmentsByPatientService(patientId);

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No se encontraron citas para este paciente' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener citas médicas por paciente' });
    }
};

// fin de la implementacion de los controladores para gestionar los pacientes








