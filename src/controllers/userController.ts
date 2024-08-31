import { Request, Response } from 'express';
import {
    getUsersService,
    createUserService,
    updateUserService,
    loginUserService
   // ,getUserByIdService
} from '../services/userService';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        console.log("Solicitud recibida en getUsers con usuarios:", users);
      
        if (users.length === 0) {
            // Si no hay usuarios encontrados, puedes enviar una respuesta 404
            res.status(404).json({ message: 'No se encontraron usuarios' });
        } else {
            // Si se encontraron usuarios, enviar la lista de usuarios
            res.status(200).json(users);
        }

    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    const { nombre, correo, clave } = req.body;

    try {
        const user = await createUserService(nombre, correo, clave);
        res.status(201).json(user); // 201 Created
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error creating user: ' + error.message });
        } else {
            res.status(400).json({ message: 'Error creating user' });
        }
    }
};

// Obtener un usuario por ID
/*export const getUserById = async (req: Request, res: Response) => {
    
    console.log("Solicitud recibida en getUserById con ID:", req.params.id);
    const { id } = req.params;

    try {
        const user = await getUserByIdService(id);
        res.status(200).json(user); // 200 OK
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'User not found: ' + error.message });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
};*/

// Actualizar un usuario existente
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const user = await updateUserService(id,updateData);
        res.status(200).json(user); // 200 OK
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error updating user: ' + error.message });
        } else {
            res.status(400).json({ message: 'Error updating user' });
        }
    }
};

// Iniciar sesión de usuario
export const loginUser = async (req: Request, res: Response) => {
    console.log("Solicitud recibida en loginUser con datos:", req.body);
    const { correo, clave } = req.body;

    try {
        const user = await loginUserService(correo, clave);
        res.status(200).json(user); // 200 OK
    } catch (error: any) {
         // Manejar errores específicos
         if (error.message === 'Correo no válido') {
            res.status(404).json({ message: 'Correo no encontrado' });
        } else if (error.message === 'Clave no válida') {
            res.status(401).json({ message: 'Clave incorrecta' });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};