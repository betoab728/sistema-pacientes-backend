import { Router } from 'express';
import { getUsers, createUser,updateUser,loginUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.post('/login', loginUser);

export default router;
