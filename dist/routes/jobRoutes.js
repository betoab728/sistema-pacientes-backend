"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//aqui se implementas las rutas de los controladores de job
//importar express
const express_1 = require("express");
//importar los controladores de job
const jobController_1 = require("../controllers/jobController");
//crear el router
const router = (0, express_1.Router)();
//definir las rutas
router.get('/', jobController_1.getJobs);
router.post('/', jobController_1.createJob);
router.get('/:id', jobController_1.getJobById);
router.put('/:id', jobController_1.updateJob);
//exportar el router
exports.default = router;
// fin de la implementacion de las rutas de los controladores de job
