import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
/*import pacienteRoutes from './routes/pacienteRoutes';
import medicoRoutes from './routes/medicoRoutes';
import historialClinicoRoutes from './routes/historialClinicoRoutes';
import informeRoutes from './routes/informeRoutes'; */
import dbConnection from './config/db';

dotenv.config();

class Server {

    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        this.middleware();
        this.routes();
        this.database();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    middleware() {
        // Parseando el body de la petición
        this.app.use(express.json());
        // Habilitar CORS
        this.app.use(cors());
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                message: 'Servidor corriendo correctamente'
            });
        });

        // Rutas
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/users', userRoutes);
        
        /*this.app.use('/api/pacientes', pacienteRoutes);
        this.app.use('/api/medicos', medicoRoutes);
        this.app.use('/api/historial-clinico', historialClinicoRoutes);
        this.app.use('/api/informes', informeRoutes); */
    }

    async database() {
        try {
            await dbConnection();
            console.log('Database online');
        } catch (error) {
          console.error('Error connecting to database:', error);
        }
    }
}

export default Server;
