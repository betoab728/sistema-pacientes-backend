"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//aqui se implementas las rutas de los controladores de job
//importar express
const express_1 = require("express");
const validarJWT_1 = require("../middlewares/validarJWT");
//importar los controladores de job
const jobController_1 = require("../controllers/jobController");
//crear el router
const router = (0, express_1.Router)();
//definir las rutas
router.get('/', validarJWT_1.validarJWT, jobController_1.getJobs);
router.post('/', validarJWT_1.validarJWT, jobController_1.createJob);
router.get('/:id', validarJWT_1.validarJWT, jobController_1.getJobById);
router.put('/:id', validarJWT_1.validarJWT, jobController_1.updateJob);
//exportar el router
exports.default = router;
// fin de la implementacion de las rutas de los controladores de job
