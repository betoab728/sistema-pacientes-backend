import { Router } from 'express';
import { getUsers, createUser,updateUser,loginUser, getUserById } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.post('/login', loginUser);
// Se agrega la ruta para obtener un usuario por ID getUserById
router.get('/:id', getUserById);

export default router;
