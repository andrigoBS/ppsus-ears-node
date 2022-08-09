import { Request, Response } from 'express';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';
import {Indicator} from "../../../entity/indicator/Indicator";

export default class IndicatorController extends AbstractController {

    constructor() {
        super();
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

        let indicator = req.body as Indicator;
        indicator = await Indicator.save(indicator);
        return res.status(HttpStatus.OK).json(indicator);
    };

    private getAll = async (req: Request, res: Response) => {
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

        let indicator = await Indicator.find();
        return res.status(HttpStatus.OK).json(indicator);
    };

}
