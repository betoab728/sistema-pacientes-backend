import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-clave'); // No devolver el campo de contraseña
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    const { nombre, correo, clave, activo = true } = req.body;

    try {
        // Validar que el correo no esté ya en uso
        const userExists = await User.findOne({ correo });
        if (userExists) {
            return res.status(400).json({ message: 'Correo ya en uso' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(clave, 10);

        // Crear el nuevo usuario
        const newUser = new User({
            nombre,
            correo,
            clave: hashedPassword,
            activo
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        // No devolver el campo de contraseña en la respuesta
        const userToReturn = {
            _id: newUser._id,
            nombre: newUser.nombre,
            correo: newUser.correo,
            fechaRegistro: newUser.fechaRegistro,
            activo: newUser.activo
        };

        res.status(201).json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: 'Error creando usuario' });
    }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, correo, clave, activo } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.nombre = nombre || user.nombre;
        user.correo = correo || user.correo;
        user.activo = typeof activo !== 'undefined' ? activo : user.activo;

        if (clave) {
            user.clave = await bcrypt.hash(clave, 10);
        }

        await user.save();

        res.json({
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            fechaRegistro: user.fechaRegistro,
            activo: user.activo
        });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando usuario' });
      
    }
};
