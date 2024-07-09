import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../config/jwt';
import { IUser } from '../models/userModel';

export const getUsersService = async () => {
    return await User.find().select('-clave'); // No devolver la clave
};

export const createUserService  = async (nombre: string, correo: string, clave: string) => {
    const userExists = await User.findOne({ correo });

    if (userExists) {
        throw new Error('El usuario ya existe');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clave, salt);

    const user = new User({
        nombre,
        correo,
        clave: hashedPassword, // Asegúrate de usar el campo correcto para la clave
        activo: true, // Valor predeterminado
        fechaRegistro: new Date()
    });

    await user.save();

    return {
      
        nombre: user.nombre,
        correo: user.correo,
        fechaRegistro: user.fechaRegistro
    };
};


export const updateUserService = async (userId: string, updateData: Partial<IUser>) => {

    const user = await User.findById(userId);


    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const { nombre, correo, clave, activo } = updateData;
    user.nombre = nombre || user.nombre;
    user.correo = correo || user.correo;
    user.activo = typeof activo !== 'undefined' ? activo : user.activo;

    if (clave) {
        const salt = await bcrypt.genSalt(10);
        user.clave = await bcrypt.hash(clave, salt);
    }

    await user.save();

    return {
        _id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        fechaRegistro: user.fechaRegistro,
        activo: user.activo
    };
};

export const loginUserService = async (correo: string, clave: string) => {
      // Buscar usuario por correo
      const user = await User.findOne({ correo });

      // Si no se encuentra el usuario, lanzar error
      if (!user) {
          throw new Error('Correo válido');
      }

      const isMatch = await user.matchPassword(clave);

      if (isMatch) {
        return {
            "message": "Usuario autenticado correctamente",
            _id: user._id,
            nombre:  user.nombre,
            correo: user.correo,
            token: generateToken(user._id as string)
        };
    } else {
        throw new Error('clave no valida');
    }
};
