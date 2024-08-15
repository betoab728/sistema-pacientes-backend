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
exports.getJobByIdService = exports.updateJobService = exports.createJobService = exports.getJobsService = void 0;
// se implementa el servicio para gestionar los trabajos
const jobModel_1 = __importDefault(require("../models/jobModel"));
//Obtener todos los trabajos
const getJobsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jobModel_1.default.find();
    }
    catch (error) {
        throw new Error('Error al obtener trabajos: ' + error.message);
    }
});
exports.getJobsService = getJobsService;
//Crear un nuevo trabajo
const createJobService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobExists = yield jobModel_1.default.findOne({ name });
        if (jobExists) {
            throw new Error('El trabajo ya existe');
        }
        const job = new jobModel_1.default({
            name
        });
        yield job.save();
        return {
            //se incluye el id
            _id: job._id,
            name: job.name
        };
    }
    catch (error) {
        throw new Error('Error al crear trabajo: ' + error.message);
    }
});
exports.createJobService = createJobService;
//Actualizar un trabajo por ID
const updateJobService = (jobId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedJob = yield jobModel_1.default.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!updatedJob) {
            throw new Error('Paciente no encontrado');
        }
        return updatedJob;
    }
    catch (error) {
        throw new Error('Error al actualizar trabajo: ' + error.message);
    }
});
exports.updateJobService = updateJobService;
//Obtener un trabajo por ID
const getJobByIdService = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield jobModel_1.default.findById(jobId);
        if (!job) {
            throw new Error('Trabajo no encontrado');
        }
        return job;
    }
    catch (error) {
        throw new Error('Error al obtener trabajo por ID: ' + error.message);
    }
});
exports.getJobByIdService = getJobByIdService;
//fin de la implementacion de los servicios para gestionar los trabajos
