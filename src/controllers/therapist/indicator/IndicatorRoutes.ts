import AbstractRoutes from '../../AbstractRoutes';
import { Request, Response } from 'express';
import IndicatorController from './IndicatorController';

export default class IndicatorRoutes extends AbstractRoutes {
    private indicatorController: IndicatorController;

    constructor() {
        super();

        this.indicatorController = new IndicatorController();

        const { create, getAll } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, create);
        router.get('/', verifyJWTMiddleware, getAll);
    }


    private create = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Indicator']
           #swagger.description = 'Endpoint para criar uma indicador de risco'
           #swagger.parameters['indicator'] = {
            in: 'body',
            required: 'true',
            description: 'Indicador de risco',
            type: 'object',
            schema: {
                "lembrar": "arrumarEsseJson"
            }

           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.indicatorController.create(req, res);
    };

    public getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Indicator']
           #swagger.description = 'Endpoint para pegar todos os indicadores'
           #swagger.parameters['indicator'] = {
            in: 'body',
            required: 'true',
            description: 'Indicador',
            type: 'object',
            schema: {
                "lembrar": "arrumarEsseJson"
            }

           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.indicatorController.getAll(req, res);
    };
}