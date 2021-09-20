import {Router} from 'express';
import Admin from './admin/Routes';

const router: Router = Router();

router.use('/admin', Admin);

export default router;
