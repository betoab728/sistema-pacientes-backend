//conect to mongo
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {

    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        console.error('MONGODB_URI no está configurada en el entorno.');
        process.exit(1); // Terminar el proceso si no está configurado
    }


    try {

        
        //await mongoose.connect(process.env.MONGODB_URI || '', {});
        await mongoose.connect(mongoURI);

        console.log('Database connected');
    } catch (error) {

        console.log(error);

        process.exit(1); 
    }
}

export default dbConnection;
