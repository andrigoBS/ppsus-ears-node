import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { ChildBirth } from '../../entity/baby/Baby';
import { HttpStatus } from '../../helpers/HttpStatus';

export default class ParentsController extends AbstractController {

    constructor() {
        super();
        const { listChildBirth } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.get('/child-birth', verifyJWTMiddleware, listChildBirth);
    }

    private listChildBirth = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Baby']
            #swagger.description = 'Tipo de parto'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */

        return res.status(HttpStatus.OK).send(ChildBirth);

    };

}
