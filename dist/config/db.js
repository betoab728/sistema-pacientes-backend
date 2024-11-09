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
//conect to mongo
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoURI = process.env.MONGODB_URI;
    console.log('MONGODB_URI:', mongoURI); // Log para verificar la URI
    if (!mongoURI) {
        console.error('MONGODB_URI no está configurada en el entorno.');
        return; // No cerrar la aplicación para permitir inspección
    }
    try {
        yield mongoose_1.default.connect(mongoURI);
        console.log('Database connected');
    }
    catch (error) {
        console.error('Full error:', error);
        // No cerrar la aplicación aquí
    }
});
exports.default = dbConnection;
