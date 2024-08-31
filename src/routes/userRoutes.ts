import { Router } from 'express';
import { getUsers, createUser,updateUser,loginUser
   // , getUserById
 } from '../controllers/userController';

const router = Router();

router.post('/login', loginUser);
/*router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.get('/', getUsers);*/

export default router;
