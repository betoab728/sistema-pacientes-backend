import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../config/jwt';
import { IUser } from '../models/userModel';

// Obtener todos los usuarios
export const getUsersService = async () => {
    try {
        return await User.find().select('-clave'); // No devolver la clave
    } catch (error) {
        throw new Error('Error al obtener usuarios: ' + (error as Error).message);
    }
};

// Crear un nuevo usuario
export const createUserService = async (nombre: string, correo: string, clave: string) => {
    try {
        const userExists = await User.findOne({ correo });

        if (userExists) {
            throw new Error('El usuario ya existe');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(clave, salt);

        const user = new User({
            nombre,
            correo,
            clave: hashedPassword,
            activo: true,
            fechaRegistro: new Date()
        });

        await user.save();

        return {
            nombre: user.nombre,
            correo: user.correo,
            fechaRegistro: user.fechaRegistro
        };
    } catch (error) {
        throw new Error('Error al crear usuario: ' + (error as Error).message);
    }
};

// Obtener un usuario por ID
/*export const getUserByIdService = async (userId: string) => {
    try {
        const user = await User.findById(userId).select('-clave');
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error('Error al obtener usuario por ID: ' + (error as Error).message);
    }
};*/

// Actualizar un usuario
export const updateUserService = async (userId: string, updateData: Partial<IUser>) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const { nombre, correo, activo } = updateData;
        user.nombre = nombre || user.nombre;
        user.correo = correo || user.correo;
        user.activo = typeof activo !== 'undefined' ? activo : user.activo;

        // La clave no se actualiza aquí

        await user.save();

        return {
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            fechaRegistro: user.fechaRegistro,
            activo: user.activo
        };
    } catch (error) {
        throw new Error('Error al actualizar usuario: ' + (error as Error).message);
    }
};
// Login de usuario
export const loginUserService = async (correo: string, clave: string) => {
    try {
        const user = await User.findOne({ correo });

        if (!user) {
            throw new Error('Correo no válido');
        }

        const isMatch = await user.matchPassword(clave);

        if (isMatch) {
            return {
                message: 'Usuario autenticado correctamente',
                _id: user._id,
                nombre: user.nombre,
                correo: user.correo,
                token: generateToken(user._id as string)
            };
        } else {
            throw new Error('Clave no válida');
        }
    } catch (error) {
        throw new Error('Error en el login de usuario: ' + (error as Error).message);
    }
};
