import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import StateController from './StateController';
import ZoneController from './ZoneController';

export default class SecretaryController extends AbstractController {

    constructor() {
        super();
        const { getDashboard } = this;
        const router = this.getRouter();
        router.use('/state', new StateController().getRouter()
            // #swagger.tags = ['StateSecretary']
        );

        router.use('/zone', new ZoneController().getRouter()
            // #swagger.tags = ['ZoneSecretary']
        );

        router.get('/dashboard', getDashboard);
    }

    private getDashboard = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Secretary']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de uma secretaria'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return res.status(HttpStatus.OK).json([
            { type: 'baby-pass-fail' },
            { type: 'baby-come-born' },
            { type: 'indicators-percent' },
            { type: 'indicators' }
        ]);
    };
}
