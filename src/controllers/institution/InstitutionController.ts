import {Request, Response} from 'express';
import {HttpStatus} from '../../helpers/HttpStatus';
import AbstractController from '../AbstractController';

export default class InstitutionController extends AbstractController {

    constructor() {
        super();
        const {createService} = this;
        const {verifyJWTMiddleware} = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, createService);
    }

    private createService = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['ReferralService']
           #swagger.description = 'Endpoint para recuperar todos os serviços de referencia'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return res.status(HttpStatus.OK).send({message: 'respond with a resource'});
    }
}
