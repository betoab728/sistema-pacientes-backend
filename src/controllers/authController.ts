import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../config/jwt';

export const registerUser = async (req: Request, res: Response) => {
    const { nombre, correo, clave } = req.body;

    try {
        const userExists = await User.findOne({ correo });

        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = await User.create({
            nombre,
            correo,
            clave
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nombre: user.nombre,
                correo: user.correo,
                token: generateToken(user._id.toString())
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario no válidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { correo, clave } = req.body;

    try {
        const user = await User.findOne({ correo });

        if (user && (await user.matchPassword(clave))) {
            res.json({
                _id: user._id,
                nombre: user.nombre,
                correo: user.correo,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Correo o clave no válidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
