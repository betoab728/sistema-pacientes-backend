// se implementa el servicio para gestionar los trabajos
import Job from '../models/jobModel';
import { IJob } from '../models/jobModel';
    //Obtener todos los trabajos
    export const getJobsService = async () => {
        try {
            return await Job.find();
        } catch (error) {
            throw new Error('Error al obtener trabajos: ' + (error as Error).message);
        }
    };
    //Crear un nuevo trabajo
    export const createJobService = async (name: string) => {
        try {
            const jobExists = await Job.findOne ({ name });
            if (jobExists) {
                throw new Error('El trabajo ya existe');
            }
            const job = new Job({
                name
            });
            await job.save();
            return {
                //se incluye el id
                _id: job._id,
                name: job.name
            };
        } catch (error) {
            throw new Error('Error al crear trabajo: ' + (error as Error).message);
        }
    }
    //Actualizar un trabajo por ID
    export const updateJobService = async (jobId: string, updateData: Partial<IJob>) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
            if (!updatedJob) {
                throw new Error('Paciente no encontrado');
            }
              return updatedJob;
        } catch (error) {
            throw new Error('Error al actualizar trabajo: ' + (error as Error).message);
        }
    }  
    //Obtener un trabajo por ID
    export const getJobByIdService = async (jobId: string) => {
        try {
            const job = await Job.findById (jobId);
            if (!job) {
                throw new Error('Trabajo no encontrado');
            }
            return job;
        } catch (error) {
            throw new Error('Error al obtener trabajo por ID: ' + (error as Error).message);
        }
    }
     
//fin de la implementacion de los servicios para gestionar los trabajos
