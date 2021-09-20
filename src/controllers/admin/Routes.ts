import {Router} from 'express';
import Users from './UserController';

const router = Router();

router.use('/users', Users);

export default router;
