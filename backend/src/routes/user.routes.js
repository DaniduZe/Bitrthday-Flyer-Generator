import { Router } from 'express';
import { listUsers, getUser, createUser, updateUser, removeUser } from '../controllers/user.controller.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', upload.single('picture'), createUser);
router.put('/:id', upload.single('picture'), updateUser);
router.delete('/:id', removeUser);

export default router;
