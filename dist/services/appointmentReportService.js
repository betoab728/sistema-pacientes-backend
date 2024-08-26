"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAppointmentsReportPDF = exports.formatStatus = exports.getAppointmentsByDateService = void 0;
//importo pdfkit para generar el PDF
const pdfkit_1 = __importDefault(require("pdfkit"));
//importo el modelo de citas del archivo appointmentModel
const appointmentModel_1 = require("../models/appointmentModel");
const getAppointmentsByDateService = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    // Validar que las fechas sean instancias de Date
    if (!(from instanceof Date) || !(to instanceof Date)) {
        throw new Error('Invalid date parameters');
    }
    // Asegurarse de que 'from' no sea después de 'to'
    if (from > to) {
        throw new Error('The "from" date cannot be after the "to" date');
    }
    try {
        const appointments = yield appointmentModel_1.Appointment.find({ date: { $gte: from, $lte: to } })
            .populate('patientID', 'name paternalSurname maternalSurname')
            .populate('doctorID', 'name paternalSurname maternalSurname');
        return appointments.map(appointment => ({
            _id: appointment._id,
            date: appointment.date,
            hour: appointment.hour,
            patient: appointment.patientID
                ? `${appointment.patientID.name} ${appointment.patientID.paternalSurname} ${appointment.patientID.maternalSurname}`
                : 'N/A',
            doctor: appointment.doctorID
                ? `${appointment.doctorID.name} ${appointment.doctorID.paternalSurname} ${appointment.doctorID.maternalSurname}`
                : 'N/A',
            office: appointment.office,
            status: (0, exports.formatStatus)(appointment.status),
        }));
    }
    catch (error) {
        throw new Error('Error al obtener citas médicas por fecha: ' + error.message);
    }
});
exports.getAppointmentsByDateService = getAppointmentsByDateService;
//funcion para formatear el campo status los valores de la base de datos son : completed, canceled, scheduled. Se debe retornar: Completada, Cancelada, Programada
const formatStatus = (status) => {
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
exports.formatStatus = formatStatus;
const generateAppointmentsReportPDF = (from, to, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos de las citas
        const appointments = yield (0, exports.getAppointmentsByDateService)(from, to);
        // Crear un nuevo documento PDF por defecto en A4 horizontal
        const doc = new pdfkit_1.default();
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
    }
    catch (error) {
        res.status(500).send('Error al generar el informe PDF: ' + error.message);
    }
});
exports.generateAppointmentsReportPDF = generateAppointmentsReportPDF;
