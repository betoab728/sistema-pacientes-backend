import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../config/jwt';

export const registerUser = async (nombre: string, correo: string, clave: string) => {
    const userExists = await User.findOne({ correo });

    if (userExists) {
        throw new Error('El usuario ya existe');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clave, salt);

    const user = new User({
        nombre,
        correo,
        clave: hashedPassword
    });

    await user.save();

    return {
        _id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        token: generateToken(user._id as string)
    };
};

export const loginUser = async (correo: string, clave: string) => {
    const user = await User.findOne({ correo });

    if (user && (await bcrypt.compare(clave, user.clave))) {
        return {
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            token: generateToken(user._id as string)
        };
    } else {
        throw new Error('Correo o clave no válidos');
    }
};
