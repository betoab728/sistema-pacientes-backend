//se eimplementan los servicios para la historia clinica
//importar el modelo de historia clinica
import { ClinicalHistory } from '../models/clinicalHistoryModel';
import { IClinicalHistory } from '../models/clinicalHistoryModel';

//obtener todas las historias clinicas de tipo async await y con trycatch
export const getClinicalHistoriesService = async () => {
    try {
        const clinicalHistories = await ClinicalHistory.find();
        return clinicalHistories;
    } catch (error) {
        throw new Error('Error al obtener historias clinicas: ' + (error as Error).message);
    }
};

//obtener una historia clinica por id
export const getClinicalHistoryByIdService = async (id: string) => {
    try {
        const clinicalHistory = await ClinicalHistory.findById(id);
        return clinicalHistory;
    } catch (error) {
        throw new Error('Error al obtener historia clinica: ' + (error as Error).message);
    }
};

//crear una historia clinica
export const createClinicalHistoryService = async (clinicalHistory: IClinicalHistory) => {
    try {
        const newClinicalHistory = new ClinicalHistory(clinicalHistory);
        await newClinicalHistory.save();
        return newClinicalHistory;
    } catch (error) {
        throw new Error('Error al crear historia clinica: ' + (error as Error).message);
    }
};

//actualizar una historia clinica por id
export const updateClinicalHistoryService = async (id: string, updateData: Partial<IClinicalHistory>) => {
    try {
        const clinicalHistory = await ClinicalHistory.findByIdAndUpdate (id, updateData, { new: true });
        return clinicalHistory;
    } catch (error) {
        throw new Error('Error al actualizar historia clinica: ' + (error as Error).message);
    }
}

//eliminar una historia clinica por id
export const deleteClinicalHistoryService = async (id: string) => {
    try {
        const clinicalHistory = await ClinicalHistory.findByIdAndDelete(id);
        return clinicalHistory;
    } catch (error) {
        throw new Error('Error al eliminar historia clinica: ' + (error as Error).message);
    }
}

//listar las historias clinicas de un paciente por id y ordenarlas por fecha de creacion descendente
export const getClinicalHistoriesByPatientIdService = async (patientId: string) => {
    try {
        const clinicalHistories = await ClinicalHistory.find({ patientId }).sort({ createdAt: -1 });
        return clinicalHistories;
    } catch (error) {
        throw new Error('Error al obtener historias clinicas: ' + (error as Error).message);
    }
}

//fin de la implementacion de los servicios para gestionar las historias clinicas