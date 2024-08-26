//importo pdfkit para generar el PDF
import PDFDocument from 'pdfkit';
import { Response } from 'express';
//importo el modelo de citas del archivo appointmentModel
import { Appointment } from '../models/appointmentModel';

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
        const appointments = await Appointment.find({ date: { $gte: from, $lte: to } })
            .populate('patientID', 'name paternalSurname maternalSurname')
            .populate('doctorID', 'name paternalSurname maternalSurname');

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
            status: formatStatus(appointment.status) ,
        }));

    } catch (error) {
        throw new Error('Error al obtener citas médicas por fecha: ' + (error as Error).message);
    }
};

//funcion para formatear el campo status los valores de la base de datos son : completed, canceled, scheduled. Se debe retornar: Completada, Cancelada, Programada
export const formatStatus = (status: string) => {
    switch (status) {
        case 'completed':
            return 'Completada';
        case 'canceled':
            return 'Cancelada';
        case 'scheduled':
            return 'Programada';
        default:
            return status;
    }
};


export const generateAppointmentsReportPDF = async (from: Date, to: Date, res: Response) => {
    try {
     
            // Obtener los datos de las citas
            const appointments = await getAppointmentsByDateService(from, to);

            // Crear un nuevo documento PDF por defecto en A4 horizontal
            const doc = new PDFDocument();
            res.setHeader('Content-Disposition', 'attachment; filename="appointments_report.pdf"');
            res.setHeader('Content-Type', 'application/pdf');
            doc.pipe(res);

            // Encabezado del PDF
            doc.fontSize(20).text('Informe de Citas Médicas', { align: 'center' });
            doc.fontSize(12).text(`Del: ${from.toLocaleDateString()} Al: ${to.toLocaleDateString()}`, { align: 'center' });
            doc.moveDown();

            // Configuración de la tabla
            const tableTop = 120;
            const marginLeft = 20; //Margen izquierdo de la tabla
            const columnWidths = [80, 80, 100, 100, 100, 80]; // Anchos de columna en puntos
            const rowHeight = 35;
            const columnTitles = ['Fecha', 'Hora', 'Paciente', 'Doctor', 'Consultorio', 'Estado'];

            // Encabezado de la tabla
            doc.fontSize(12).font('Helvetica-Bold');
            columnTitles.forEach((title, i) => {
                doc.text(title, marginLeft + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), tableTop, { width: columnWidths[i], align: 'center' });
            });

            // Separador de encabezado
            doc.moveTo(marginLeft, tableTop + rowHeight)
            .lineTo(marginLeft + columnWidths.reduce((a, b) => a + b, 0), tableTop + rowHeight)
            .stroke();

            doc.font('Helvetica');
            let y = tableTop + rowHeight + 5; // Espacio debajo del encabezado

            // Filas de la tabla
            appointments.forEach(appointment => {
                doc.text(appointment.date.toLocaleDateString(), marginLeft, y, { width: columnWidths[0], align: 'center' });
                doc.text(appointment.hour, marginLeft + columnWidths[0], y, { width: columnWidths[1], align: 'center' });
                doc.text(appointment.patient, marginLeft + columnWidths[0] + columnWidths[1], y, { width: columnWidths[2] });
                doc.text(appointment.doctor, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2], y, { width: columnWidths[3] });
                doc.text(appointment.office, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], y, { width: columnWidths[4], align: 'center' });
                doc.text(appointment.status, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], y, { width: columnWidths[5], align: 'center' });

                y += rowHeight;
            });

            // Finalizar el documento
            doc.end();
        
    } catch (error) {
        res.status(500).send('Error al generar el informe PDF: ' + (error as Error).message);
    }
};
