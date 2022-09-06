import { HttpStatus } from '../../AbstractHttpErrors';
import AbstractRoutes from '../../AbstractRoutes';
import { Request, Response } from 'express';
import { Indicator } from '../../../entity/indicator/Indicator';

export default class IndicatorController extends AbstractRoutes {

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

        try{
            let indicator = req.body as Indicator;
            indicator.therapist = req.body.jwtObject.id;
            indicator = await Indicator.save(indicator);

            return res.status(HttpStatus.OK).json(indicator);
        } catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ fancyMessage: 'Ocorreu um erro ao tentar criar o indicador de risco', message: e });
        }
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

        try {
            const indicator = await Indicator.createQueryBuilder('indicator')
                .select(['indicator.id', 'indicator.name'])
                .where('indicator.therapist = :id', { id: req.body.jwtObject.id })
                .orWhere('indicator.therapist is null')
                .getMany();
            return res.status(HttpStatus.OK).json(indicator);
        } catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ fancyMessage: 'Ocorreu um erro ao tentar consultar os indicadores de risco', message: e });
        }
    };

}
