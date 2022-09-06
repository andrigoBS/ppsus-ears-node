import { HttpStatus } from '../../AbstractHttpErrors';
import AbstractRoutes from '../../AbstractRoutes';
import { Request, Response } from 'express';
import { Conduct } from '../../../entity/conduct/Conduct';
import ConductRepository from './ConductRepository';

export default class ConductController extends AbstractRoutes {
    private readonly conductRepository = new ConductRepository();

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
           #swagger.tags = ['Conduct']
           #swagger.description = 'Endpoint para criar uma conduta'
           #swagger.parameters['conduct'] = {
            in: 'body',
            required: 'true',
            description: 'Conduta',
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
            const therapistId = req.body.jwtObject.id;

            let conduct = req.body as Conduct;
            conduct.therapist = therapistId;
            conduct = await this.conductRepository.save(conduct);

            return res.status(HttpStatus.OK).json(conduct);
        } catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ fancyMessage: 'Ocorreu um erro ao tentar criar a conduta', message: e });
        }
    };

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Conduct']
           #swagger.description = 'Endpoint para pegar todos as condutas'
           #swagger.parameters['conduct'] = {
            in: 'body',
            required: 'true',
            description: 'Conduta',
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
            const therapistId = req.body.jwtObject.id;
            const conduct = await this.conductRepository.getAll(therapistId);

            return res.status(HttpStatus.OK).json(conduct);
        } catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ fancyMessage: 'Ocorreu um erro ao tentar consultar as condutas', message: e });
        }
    };

}
