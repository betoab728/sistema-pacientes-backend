//aqui se implementas las rutas de los controladores de job
//importar express
import { Router } from 'express';
//importar los controladores de job
import { getJobs, createJob, getJobById, updateJob } from '../controllers/jobController';
//crear el router
const router = Router();
//definir las rutas
router.get('/', getJobs);
router.post('/', createJob);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
//exportar el router
export default router;
// fin de la implementacion de las rutas de los controladores de job
