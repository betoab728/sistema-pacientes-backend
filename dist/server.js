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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
/*import pacienteRoutes from './routes/pacienteRoutes';
import medicoRoutes from './routes/medicoRoutes';
import historialClinicoRoutes from './routes/historialClinicoRoutes';
import informeRoutes from './routes/informeRoutes'; */
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.middleware();
        this.routes();
        this.database();
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    middleware() {
        // Parseando el body de la petición
        this.app.use(express_1.default.json());
        // Habilitar CORS
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Servidor corriendo correctamente'
            });
        });
        // Rutas
        this.app.use('/api/users', userRoutes_1.default);
        /*this.app.use('/api/pacientes', pacienteRoutes);
        this.app.use('/api/medicos', medicoRoutes);
        this.app.use('/api/historial-clinico', historialClinicoRoutes);
        this.app.use('/api/informes', informeRoutes); */
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, db_1.default)();
                console.log('Database online');
            }
            catch (error) {
                console.error('Error connecting to database:', error);
            }
        });
    }
}
exports.default = Server;
