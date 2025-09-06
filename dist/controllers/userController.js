"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getUsers = void 0;
const userService_1 = require("../services/userService");
// Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUsersService)();
        console.log("Solicitud recibida en getUsers con usuarios:", users);
        if (users.length === 0) {
            // Si no hay usuarios encontrados, puedes enviar una respuesta 404
            res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        else {
            // Si se encontraron usuarios, enviar la lista de usuarios
            res.status(200).json(users);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
exports.getUsers = getUsers;
// Crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, clave } = req.body;
    try {
        const user = yield (0, userService_1.createUserService)(nombre, correo, clave);
        res.status(201).json(user); // 201 Created
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error creating user: ' + error.message });
        }
        else {
            res.status(400).json({ message: 'Error creating user' });
        }
    }
});
exports.createUser = createUser;
// Obtener un usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Solicitud recibida en getUserById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const user = yield (0, userService_1.getUserByIdService)(id);
        res.status(200).json(user); // 200 OK
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'User not found: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
});
exports.getUserById = getUserById;
// Actualizar un usuario existente
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const user = yield (0, userService_1.updateUserService)(id, updateData);
        res.status(200).json(user); // 200 OK
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error updating user: ' + error.message });
        }
        else {
            res.status(400).json({ message: 'Error updating user' });
        }
    }
});
exports.updateUser = updateUser;
// Iniciar sesión de usuario
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Solicitud recibida en loginUser con datos:", req.body);
    const { correo, clave } = req.body;
    try {
        const user = yield (0, userService_1.loginUserService)(correo, clave);
        res.status(200).json(user); // 200 OK
    }
    catch (error) {
        // Manejar errores específicos
        if (error.message === 'Correo no válido') {
            res.status(401).json({ message: 'Correo no encontrado' });
        }
        else if (error.message === 'Clave no válida') {
            res.status(401).json({ message: 'Clave incorrecta' });
        }
        else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
});
exports.loginUser = loginUser;
