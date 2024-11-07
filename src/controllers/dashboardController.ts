import { Request, Response } from 'express';
//importar servicio de dashboardservice
import { getDashboardData } from '../services/dashboardService';

export const getDashboard = async (req: Request, res: Response) => {
    try {
        console.log('Obteniendo datos del dashboard');
        const data = await getDashboardData();
        res.json(data);
        console.log('Obteniendo...');
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos del dashboard' });
    }
};