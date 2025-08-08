//aqui se implementas las rutas de los controladores de job
//importar express
import { Router } from 'express';
import { validarJWT } from '../middlewares/validarJWT';
//importar los controladores de job
import { getJobs, createJob, getJobById, updateJob } from '../controllers/jobController';
//crear el router
const router = Router();
//definir las rutas
router.get('/', validarJWT, getJobs);
router.post('/', validarJWT, createJob);
router.get('/:id', validarJWT, getJobById);
router.put('/:id', validarJWT, updateJob);
//exportar el router
export default router;
// fin de la implementacion de las rutas de los controladores de job
