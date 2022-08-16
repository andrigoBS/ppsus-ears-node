import { Request, Response } from 'express';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';
import { Conduct } from '../../../entity/conduct/Conduct';

export default class ConductController extends AbstractController {

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

        let conduct = req.body as Conduct;
        conduct.therapist = req.body.jwtObject.id;
        conduct = await Conduct.save(conduct);
        return res.status(HttpStatus.OK).json(conduct);
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

        const conduct = await Conduct.createQueryBuilder('conduct')
            .select([
                'conduct.id AS id',
                'CONCAT(conduct.resultDescription, conduct.accompanyDescription) AS name',
                'conduct.resultDescription AS resultDescription',
                'conduct.accompanyDescription AS accompanyDescription',
                'conduct.leftEar AS leftEar',
                'conduct.rightEar AS rightEar',
                'conduct.irda AS irda',
                'conduct.testType AS testType'
            ])
            .where('conduct.therapist = :id', { id: req.body.jwtObject.id })
            .orWhere('conduct.therapist is null')
            .getRawMany();
        return res.status(HttpStatus.OK).json(conduct);
    };

}
