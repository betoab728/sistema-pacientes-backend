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
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const db_1 = __importDefault(require("./config/db"));
//para las historias clinicas
const clinicalHistoryRoutes_1 = __importDefault(require("./routes/clinicalHistoryRoutes"));
//ruta de dashboard
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const specialtyRoutes_1 = __importDefault(require("./routes/specialtyRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middleware();
        this.routes();
        this.database();
        this.listen();
    }
    listen() {
        this.app.listen(Number(this.port), '0.0.0.0', () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    middleware() {
        // Indicar a Express que confíe en el proxy (Nginx en este caso)
        this.app.set('trust proxy', true);
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
        this.app.use('/users', userRoutes_1.default); // Para usuarios
        //ruta para trabajos o jobs
        this.app.use('/jobs', jobRoutes_1.default);
        this.app.use('/patients', patientRoutes_1.default); // Para pacientes
        this.app.use('/doctors', doctorRoutes_1.default); // Para médicos
        this.app.use('/appointments', appointmentRoutes_1.default); // Para citas
        //ruta para historias clinicas
        this.app.use('/clinical-histories', clinicalHistoryRoutes_1.default);
        //ruta para dashboard
        this.app.use('/dashboard', dashboardRoutes_1.default);
        this.app.use('/specialties', specialtyRoutes_1.default);
        // Documentación Swagger
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocs));
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
