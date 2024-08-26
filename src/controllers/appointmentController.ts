//se implementa el controlador de citas medicas con los servicios de citas medicas
//importar los servicios de citas medicas
import { Request, Response } from 'express';
import { generateAppointmentsReportPDF } from '../services/appointmentReportService';


import { getAppointmentsService, getAppointmentByIdService, createAppointmentService, updateAppointmentService,
     deleteAppointmentService, getAppointmentsByDateService,updateAppointmentStatusService } from '../services/appointmentService';

//obtener todas las citas medicas
export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointmentsService();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener citas medicas' });      
    }
};

//crear una nueva cita medica
export const createAppointment = async (req: Request, res: Response) => {
    const appointment = req.body;
    try {
        const newAppointment = await createAppointmentService(appointment);
        res.status(201).json(newAppointment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error al crear cita medica: ' + error.message });
        } else {
            res.status(400).json({ message: 'Error al crear cita medica' });
        }
    }
};

//obtener una cita medica por ID
export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await getAppointmentByIdService(id);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cita medica' });
    }
};

//actualizar una cita medica por ID
export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const appointment = await updateAppointmentService(id, updateData);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cita medica' });
    }
};

//eliminar una cita medica por ID
export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await deleteAppointmentService(id);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cita medica' });
    }
};

//obtener citas medicas por fecha desde y hasta
export const getAppointmentsByDate = async (req: Request, res: Response) => {
    const { from, to } = req.params;
    try {
        
        const fromDate = new Date(from);
        const toDate = new Date(to);

        // Verificar si las fechas son válidas
        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return res.status(400).json({ message: 'Las fechas proporcionadas no son válidas.' });
        }

        const appointments = await getAppointmentsByDateService(fromDate, toDate);
        res.status(200).json(appointments);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener citas medicas' });
    }
};

//actualizar el estado de una cita medica por ID

export const updateAppointmentStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedAppointment = await updateAppointmentStatusService(id, status);
        if (updatedAppointment) {
            res.status(200).json(updatedAppointment);
        } else {
            res.status(404).json({ message: 'Cita medica no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado de la cita' });
    }
};

export const getAppointmentsReport = async (req: Request, res: Response) => {
    try {
        const { from, to } = req.params;

        if (!from || !to) {
            return res.status(400).send('Las fechas "from" y "to" son requeridas.');
        }

        const fromDate = new Date(from as string);
        const toDate = new Date(to as string);

        await generateAppointmentsReportPDF(fromDate, toDate, res);

    } catch (error) {
        res.status(500).send('Error al generar el informe: ' + (error as Error).message);
    }
};



//fin de la implementacion del controlador de citas medicas



