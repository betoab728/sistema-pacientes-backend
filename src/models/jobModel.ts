//modelo para la entidad job o trabajo, solo se manejara el id que lo genere mongodb y el nombre del trabajo que se registrara
//importar mongoose
import mongoose from 'mongoose';
//definir la interfaz para el modelo de trabajo
export interface IJob extends mongoose.Document {
    name: string;
}
//definir el esquema de trabajo
const JobSchema = new mongoose.Schema<IJob>({
    name: {
        type: String,
        required: true,
        //tiene que ser unico
        unique: true
    }
}, {
    timestamps: true,
    collection: 'jobs' // Especificar el nombre de la colección
});
//crear el modelo de trabajo
const Job = mongoose.model<IJob>('Job', JobSchema);
//exportar el modelo de trabajo
export default Job;
