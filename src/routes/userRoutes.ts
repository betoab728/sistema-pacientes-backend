import { Router } from 'express';
import { getUsers, createUser,updateUser,loginUser, getUserById } from '../controllers/userController';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.post('/login', loginUser);
router.post('/', createUser);

// Las rutas protegidas que requieren token:
router.put('/:id',validarJWT, updateUser);
router.get('/:id',validarJWT, getUserById);
router.get('/',validarJWT, getUsers);

export default router;
