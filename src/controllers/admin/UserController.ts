import {Request, Response, Router} from 'express';
import HttpStatus from '../../helpers/HttpStatus';

const router = Router();

router.get('/', function(req: Request, res: Response, next: Function) {
    res.status(HttpStatus.ok).send({message: 'respond with a resource'});
});

export default router;
