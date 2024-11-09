//conect to mongo
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {

    const mongoURI = process.env.MONGODB_URI;

    console.log('MONGODB_URI:', mongoURI); // Log para verificar la URI

    if (!mongoURI) {
        console.error('MONGODB_URI no está configurada en el entorno.');
        return; // No cerrar la aplicación para permitir inspección
    }

    try {
        await mongoose.connect(mongoURI);
        console.log('Database connected');
    } catch (error) {
       
        console.error('Full error:', error);
        // No cerrar la aplicación aquí
    }
}

export default dbConnection;
