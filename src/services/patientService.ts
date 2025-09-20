//se implementa el servicio para la colección de pacientes que se registraran en la base de datos
import { IPatient } from '../models/patientModel';
import Patient from '../models/patientModel';
import { Appointment,IAppointment  } from '../models/appointmentModel';
    //Obtener todos los pacientes
    export const getPatientsService = async () => {
        try {
            return await Patient.find();
        } catch (error) {
            throw new Error('Error al obtener pacientes: ' + (error as Error).message);
        }
    };
    //Crear un nuevo paciente se toma en cuenta que job es un objeto de tipo mongoose.Types.ObjectId y no un string con referencia al modelo job
    export const createPatientService = async (patient: IPatient) => {
        try {
            const patientExists = await Patient.findOne ({ dni: patient.dni });
            if (patientExists) {
                throw new Error('El paciente ya existe');
            }
            const newPatient = new Patient({
                dni: patient.dni,
                name: patient.name,
                paternalSurname: patient.paternalSurname,
                maternalSurname: patient.maternalSurname,
                dateBirth: patient.dateBirth,
                gender: patient.gender,
                address: patient.address,
                email: patient.email,
                phone: patient.phone,
                familyHistory: patient.familyHistory,
                allergies: patient.allergies,
                job: patient.job
            });
            await newPatient.save();
            return {
                dni: newPatient.dni,
                name: newPatient.name
            };
        } catch (error) {
            throw new Error('Error al crear paciente: ' + (error as Error).message);
        }   
    }   
    //Obtener un paciente por ID
    export const getPatientByIdService = async (patientId: string) => {
        try {
            const patient = await Patient.findById(patientId);
            if (!patient) {
                throw new Error('Paciente no encontrado');
            }
            return patient;
        } catch (error) {
            throw new Error('Error al obtener paciente por ID: ' + (error as Error).message);
        }
    };
    //Actualizar un paciente
    export const updatePatientService = async (patientId: string, updateData: Partial<IPatient>) => {
        try {
            const patient = await Patient.findByIdAndUpdate(patientId, updateData, { new: true });
            if (!patient) {
                throw new Error('Paciente no encontrado');
            }
            return patient;
        } catch (error) {
            throw new Error('Error al actualizar paciente: ' + (error as Error).message);
        }
    }
    //Eliminar un paciente
    export const deletePatientService = async (patientId: string) => {
        try {
            const patient = await Patient
            .findByIdAndDelete(patientId);
            if (!patient) {
                throw new Error('Paciente no encontrado');
            }
            return patient;
        } catch (error) {
            throw new Error('Error al eliminar paciente: ' + (error as Error).message);
        }
    }
    //Obtener pacientes por trabajo
    export const getPatientsByJobService = async (jobId: string) => {
        try {
            return await Patient.find({ job: jobId });
        } catch (error) {
            throw new Error('Error al obtener pacientes por trabajo: ' + (error as Error).message);
        }
    }
    // se incluye busqueda de pacientes por nombre
    export const getPatientsByNameService = async (name: string) => {
        try {
            return await Patient.find({ name: name });
        } catch (error) {
            throw new Error('Error al obtener pacientes por nombre: ' + (error as Error).message);
        }
    }
    // se incluye busqueda de pacientes por apellido paterno
    export const getPatientsByPaternalSurnameService = async (paternalSurname: string) => {
        try {
            return await Patient.find({ paternalSurname: paternalSurname });
        } catch (error) {
            throw new Error('Error al obtener pacientes por apellido paterno: ' + (error as Error).message);
        }
    }
    // se incluye busqueda de pacientes por apellido materno
    export const getPatientsByMaternalSurnameService = async (maternalSurname: string) => {
        try {
            return await Patient.find({ maternalSurname: maternalSurname });
        } catch (error) {
            throw new Error('Error al obtener pacientes por apellido materno: ' + (error as Error).message);
        }
    }
    // se incluye busqueda de pacientes por dni
    export const getPatientsByDniService = async (dni: string) => {
        try {
            return await Patient.find({ dni: dni });
        } catch (error) {
            throw new Error('Error al obtener pacientes por dni: ' + (error as Error).message);
        }
    }

    //Listar las citas medicas por paciente
// Listar las citas médicas por paciente
export const getAppointmentsByPatientService = async (patientId: string) => {
    try {
        const appointments = await Appointment.find({ patientID: patientId })
            .populate('patientID', 'name paternalSurname maternalSurname')
            .populate({
                path: 'doctorID',
                select: 'name paternalSurname maternalSurname specialtyID',
                populate: {
                    path: 'specialtyID',
                    select: 'specialty'
                }
            });

        return appointments.map(appointment => {
            const patient = appointment.patientID as any;
            const doctor = appointment.doctorID as any;

            // Formato de fecha "dd/MM/yyyy"
            const fechaFormateada = new Date(appointment.date).toLocaleDateString('es-PE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            return {
                id: appointment._id, // 👈 cambiado de _id → id
                fecha: fechaFormateada,
                hora: appointment.hour,
                paciente: patient 
                    ? `${patient.name} ${patient.paternalSurname} ${patient.maternalSurname}`
                    : 'N/A',
                doctor: doctor 
                    ? `${doctor.name} ${doctor.paternalSurname} ${doctor.maternalSurname}`
                    : 'N/A',
                consultorio: appointment.office,
                estado: appointment.status,
                especialidad: doctor?.specialtyID?.specialty || 'N/A'
            };
        });
    } catch (error) {
        throw new Error(
            'Error al obtener citas médicas por paciente: ' + (error as Error).message
        );
    }
};




    // fin de la implementacion de los servicios para gestionar los pacientes




              