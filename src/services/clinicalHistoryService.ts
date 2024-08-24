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
        const clinicalHistory  = await ClinicalHistory.findById(id)
        .populate('doctorId', 'name paternalSurname maternalSurname')
        .populate('patientId', 'name paternalSurname maternalSurname');

        if (!clinicalHistory) {
            throw new Error('Historia clinica no encontrada');
        }
        const doctor = clinicalHistory.doctorId as any;

         // Mapear para incluir el nombre completo del doctor en el resultado
         return {
            _id: clinicalHistory._id,
            patientId:  clinicalHistory.patientId ? (clinicalHistory.patientId as any)._id : 'N/A',
            patient: clinicalHistory.patientId 
                ? `${(clinicalHistory.patientId as any).name} ${(clinicalHistory.patientId as any).paternalSurname} ${(clinicalHistory.patientId as any).maternalSurname}` 
                : 'N/A',
            doctor: clinicalHistory.doctorId 
                ? `${(clinicalHistory.doctorId as any).name} ${(clinicalHistory.doctorId as any).paternalSurname} ${(clinicalHistory.doctorId as any).maternalSurname}` 
                : 'N/A',
            date: clinicalHistory.date,
            hour: clinicalHistory.hour,
            symptoms: clinicalHistory.symptoms,
            diagnosis: clinicalHistory.diagnosis,
            tests: clinicalHistory.tests,
            treatment: clinicalHistory.treatment,
            notes: clinicalHistory.notes


         }



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

        const clinicalHistories = await ClinicalHistory.find({ patientId })
        .populate('patientId', 'name paternalSurname maternalSurname')
        .sort({ createdAt: -1 });

         // Mapear para incluir el nombre completo del paciente en el resultado
         return clinicalHistories.map(history => ({
            _id: history._id,
            patient: history.patientId 
                ? `${(history.patientId as any).name} ${(history.patientId as any).paternalSurname} ${(history.patientId as any).maternalSurname}` 
                : 'N/A',
            doctorId: history.doctorId,
            date: history.date,
            hour: history.hour,
            symptoms: history.symptoms,
            diagnosis: history.diagnosis,
            tests: history.tests,
            treatment: history.treatment,
            notes: history.notes
        }));


    } catch (error) {
        throw new Error('Error al obtener historias clinicas: ' + (error as Error).message);
    }
}

//fin de la implementacion de los servicios para gestionar las historias clinicas