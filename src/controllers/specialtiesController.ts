import Specialty from '../models/specialtyModel';
import { Request, Response } from 'express';


export const getSpecialties = async (req: Request, res: Response) => {
    try {
        const specialties = await Specialty.find();
        res.status(200).json(specialties);
    } catch (error) {
        console.error('Error fetching specialties:', error);
        res.status(500).json({ message: 'Error fetching specialties' });
    }
};
