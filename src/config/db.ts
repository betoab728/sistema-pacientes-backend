//conect to mongo
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {});

        console.log('Database connected');
    } catch (error) {

        console.log(error);

        throw new Error('Error connecting to database');
    }
}

export default dbConnection;
