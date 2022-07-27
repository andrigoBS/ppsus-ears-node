import { Request, Response } from 'express';
import { ChildBirth } from '../../entity/baby/Baby';
import { HttpStatus } from '../../helpers/HttpStatus';
import LoginHelper from '../../helpers/LoginHelper';
import AbstractController from '../AbstractController';

export default class ParentsController extends AbstractController {

    constructor() {
        super();
        const { listChildBirth } = this;
        const router = this.getRouter();
        router.get('/child-birth', listChildBirth);
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
