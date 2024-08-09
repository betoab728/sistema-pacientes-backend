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
exports.updateJob = exports.getJobById = exports.createJob = exports.getJobs = void 0;
const jobService_1 = require("../services/jobService");
//Obtener todos los trabajos
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield (0, jobService_1.getJobsService)();
        console.log("Solicitud recibida en getJobs con trabajos:", jobs);
        if (jobs.length === 0) {
            res.status(404).json({ message: 'No se encontraron trabajos' });
        }
        else {
            res.status(200).json(jobs);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});
exports.getJobs = getJobs;
//Crear un nuevo trabajo
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const job = yield (0, jobService_1.createJobService)(name);
        res.status(201).json(job);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error creating job: ' + error.message });
        }
        else {
            res.status(400).json({ message: 'Error creating job' });
        }
    }
});
exports.createJob = createJob;
//Obtener un trabajo por ID
const getJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Solicitud recibida en getJobById con ID:", req.params.id);
    const { id } = req.params;
    try {
        const job = yield (0, jobService_1.getJobByIdService)(id);
        res.status(200).json(job);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Job not found: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Job not found' });
        }
    }
});
exports.getJobById = getJobById;
//Actualizar un trabajo por ID
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const job = yield (0, jobService_1.updateJobService)(id, updateData);
        res.status(200).json(job);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Job not found: ' + error.message });
        }
        else {
            res.status(404).json({ message: 'Job not found' });
        }
    }
});
exports.updateJob = updateJob;
//fin de la implementacion de los controladores para gestionar los trabajos
