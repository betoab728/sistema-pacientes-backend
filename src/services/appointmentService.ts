//se implementa los srvicios para las citas medicas
//importar el modelo de cita medica
import { Appointment } from '../models/appointmentModel';
import { IAppointment } from '../models/appointmentModel';


//obtener todas las citas medicas de tipo async await y con trycatch
export const getAppointmentsService = async () => {
    try {
      
        try {
            const appointments = await Appointment.find({}, '_id date hour office status')
            .populate('patientID', 'name paternalSurname maternalSurname') // Incluye los apellidos del paciente
            .populate('doctorID', 'name paternalSurname maternalSurname'); // Incluye los apellidos del doctor

        return appointments.map(appointment => ({
            _id: appointment._id,
            date: appointment.date,
            hour: appointment.hour,
            patient: appointment.patientID 
                ? `${(appointment.patientID as any).name} ${(appointment.patientID as any).paternalSurname} ${(appointment.patientID as any).maternalSurname}` 
                : 'N/A',
            doctor: appointment.doctorID 
                ? `${(appointment.doctorID as any).name} ${(appointment.doctorID as any).paternalSurname} ${(appointment.doctorID as any).maternalSurname}` 
                : 'N/A',
            office: appointment.office,
            status: appointment.status,
        }));

            
        } catch (error) {
            throw new Error('Error al obtener citas medicas: ' + (error as Error).message);
        }

    } catch (error) {
        throw new Error('Error al obtener citas médicas: ' + (error as Error).message);
    }
};

//obtener una cita medica por id
export const getAppointmentByIdService = async (id: string) => {
    try {
        const appointment = await Appointment.findById(id);
        return appointment;
    } catch (error) {
        throw new Error('Error al obtener cita medica: ' + (error as Error).message);
    }
};

//crear una cita medica
export const createAppointmentService = async (appointment: IAppointment) => {
    try {
        const newAppointment = new Appointment(appointment);
        await newAppointment.save();
        return newAppointment;
    } catch (error) {
        throw new Error('Error al crear cita medica: ' + (error as Error).message);
    }
};

//actualizar una cita medica por id

export const updateAppointmentService = async (id: string, updateData: Partial<IAppointment>) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
        return appointment;
    } catch (error) {
        throw new Error('Error al actualizar cita medica: ' + (error as Error).message);
    }
}
// se actualiza el estado de la cita medica por id
export const updateAppointmentStatusService = async (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id, 
            { status }, // Solo actualiza el campo status
            { new: true }
        );
        return updatedAppointment;
    } catch (error) {
        throw new Error('Error al actualizar el estado de la cita: ' + (error as Error).message);
    }
};


//eliminar una cita medica por id

export const deleteAppointmentService = async (id: string) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        return appointment;
    } catch (error) {
        throw new Error('Error al eliminar cita medica: ' + (error as Error).message);
    }
}

// se busca las citas medicas por fecha desde y hasta
export const getAppointmentsByDateService = async (from: Date, to: Date) => {

     // Validar que las fechas sean instancias de Date
     if (!(from instanceof Date) || !(to instanceof Date)) {
        throw new Error('Invalid date parameters');
    }
    
    // Asegurarse de que 'from' no sea después de 'to'
    if (from > to) {
        throw new Error('The "from" date cannot be after the "to" date');
    }

    try {
        console.log('from y to', from , to);
        const appointments= await Appointment.find({ date: { $gte: from, $lte: to } })
        .populate('patientID', 'name paternalSurname maternalSurname') // Incluye los apellidos del paciente
        .populate('doctorID', 'name paternalSurname maternalSurname'); // Incluye los apellidos del doctor;

        return appointments.map(appointment => ({
            _id: appointment._id,
            date: appointment.date,
            hour: appointment.hour,
            patient: appointment.patientID 
                ? `${(appointment.patientID as any).name} ${(appointment.patientID as any).paternalSurname} ${(appointment.patientID as any).maternalSurname}` 
                : 'N/A',
            doctor: appointment.doctorID 
                ? `${(appointment.doctorID as any).name} ${(appointment.doctorID as any).paternalSurname} ${(appointment.doctorID as any).maternalSurname}` 
                : 'N/A',
            office: appointment.office,
            status: appointment.status,
        }));


    } catch (error) {
        throw new Error('Error al obtener citas medicas por fecha: ' + (error as Error).message);
    }
}

