//este es el controlador aqui implementamos las funciones de los servicios de jobService
import { Request, Response } from 'express';
import {
    getJobsService,
    createJobService,
    getJobByIdService,
    updateJobService
} from '../services/jobService';
//Obtener todos los trabajos
export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await getJobsService();
        console.log("Solicitud recibida en getJobs con trabajos:", jobs);
        if (jobs.length === 0) {
            res.status(404).json({ message: 'No se encontraron trabajos' });
        } else {
            res.status(200).json(jobs);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};
//Crear un nuevo trabajo
export const createJob = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const job = await createJobService(name);
        res.status(201).json(job);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error creating job: ' + error.message });
        } else {
            res.status(400).json({ message: 'Error creating job' });
        }
    }
};
//Obtener un trabajo por ID
export const getJobById = async (req: Request, res: Response) => {
    console.log("Solicitud recibida en getJobById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const job = await getJobByIdService(id);
        res.status(200).json(job);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Job not found: ' + error.message });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    }
};
//Actualizar un trabajo por ID
export const updateJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const job = await updateJobService(id, updateData);
        res.status(200).json(job);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Job not found: ' + error.message });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    }
};
//fin de la implementacion de los controladores para gestionar los trabajos
