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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.updateUserService = exports.createUserService = exports.getUsersService = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../config/jwt"));
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.find().select('-clave'); // No devolver la clave
});
exports.getUsersService = getUsersService;
const createUserService = (nombre, correo, clave) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield userModel_1.default.findOne({ correo });
    if (userExists) {
        throw new Error('El usuario ya existe');
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(clave, salt);
    const user = new userModel_1.default({
        nombre,
        correo,
        clave: hashedPassword, // Asegúrate de usar el campo correcto para la clave
        activo: true, // Valor predeterminado
        fechaRegistro: new Date()
    });
    yield user.save();
    return {
        nombre: user.nombre,
        correo: user.correo,
        fechaRegistro: user.fechaRegistro
    };
});
exports.createUserService = createUserService;
const updateUserService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const { nombre, correo, clave, activo } = updateData;
    user.nombre = nombre || user.nombre;
    user.correo = correo || user.correo;
    user.activo = typeof activo !== 'undefined' ? activo : user.activo;
    if (clave) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.clave = yield bcryptjs_1.default.hash(clave, salt);
    }
    yield user.save();
    return {
        _id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        fechaRegistro: user.fechaRegistro,
        activo: user.activo
    };
});
exports.updateUserService = updateUserService;
const loginUserService = (correo, clave) => __awaiter(void 0, void 0, void 0, function* () {
    // Buscar usuario por correo
    const user = yield userModel_1.default.findOne({ correo });
    // Si no se encuentra el usuario, lanzar error
    if (!user) {
        throw new Error('Correo válido');
    }
    const isMatch = yield user.matchPassword(clave);
    if (isMatch) {
        return {
            "message": "Usuario autenticado correctamente",
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            token: (0, jwt_1.default)(user._id)
        };
    }
    else {
        throw new Error('clave no valida');
    }
});
exports.loginUserService = loginUserService;
