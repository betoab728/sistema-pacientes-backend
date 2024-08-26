// se implementa el controlador para las historias clinicas
import { Request, Response } from 'express';

import { createClinicalHistoryService, deleteClinicalHistoryService, getClinicalHistoriesByPatientIdService, getClinicalHistoriesService, 
    getClinicalHistoryByIdService, updateClinicalHistoryService } from '../services/clinicalHistoryService';

//Obtener todas las historias clinicas
export const getClinicalHistories = async (req: Request, res: Response) => {
    try {
        const clinicalHistories = await getClinicalHistoriesService();
        console.log("Solicitud recibida en getClinicalHistories con historias clinicas:", clinicalHistories);
        if (clinicalHistories.length === 0) {
            res.status(404).json({ message: 'No se encontraron historias clinicas' });
        } else {
            res.status(200).json(clinicalHistories);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener historias clinicas' });
    }
};

//Crear una nueva historia clinica
export const createClinicalHistory = async (req: Request, res: Response) => {
    const clinicalHistory = req.body;
    try {
        const newClinicalHistory = await createClinicalHistoryService(clinicalHistory);
        res.status(201).json(newClinicalHistory);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear historia clinica: ' + error.message });
        } else {
            res.status(400).json({ message: 'Error al crear historia clinica' });
        }
    }
};

//Obtener una historia clinica por ID
export const getClinicalHistoryById = async (req: Request, res: Response) => {
    console.log("Solicitud recibida en getClinicalHistoryById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const clinicalHistory = await getClinicalHistoryByIdService(id);
        res.status(200).json(clinicalHistory);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Historia clinica no encontrada: ' + error.message });
        } else {
            res.status(404).json({ message: 'Historia clinica no encontrada' });
        }
    }
};

//Actualizar una historia clinica por ID
export const updateClinicalHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const clinicalHistory = await updateClinicalHistoryService(id, updateData);
        res.status(200).json(clinicalHistory);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Historia clinica no encontrada: ' + error.message });
        } else {
            res.status(404).json({ message: 'Historia clinica no encontrada' });
        }
    }
};

//Eliminar una historia clinica por ID

export const deleteClinicalHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const clinicalHistory = await deleteClinicalHistoryService(id);
        res.status(200).json(clinicalHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar historia clinica' });
    }
};

//Listar las historias clinicas de un paciente por ID y ordenarlas por fecha de creacion descendente
export const getClinicalHistoriesByPatientId = async (req: Request, res: Response) => {
    const { patientId } = req.params;
    try {
       
        const clinicalHistories = await getClinicalHistoriesByPatientIdService(patientId);

        if (clinicalHistories.length === 0) {
            // Devuelve un 200 con un mensaje y un array vacío
            res.status(200).json({ 
                message: 'El paciente no tiene historial de visitas.', 
                data: [] 
            });
        } else {
            // Devuelve un 200 con los datos encontrados
            res.status(200).json(clinicalHistories);
        }

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener historias clinicas' });
    }
};

//fin de la implementacion del controlador para las historias clinicas