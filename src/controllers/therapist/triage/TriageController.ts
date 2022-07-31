import { Request, Response } from 'express';
import { Triage, TriageType } from '../../../entity/triage/Triage';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';

export default class TriageController extends AbstractController {

    constructor() {
        super();
        const { create, triageTypes } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', create);
        router.get('/types', triageTypes);
    }

    private create = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Triage']
           #swagger.description = 'Endpoint para criar uma consulta/triagem'
           #swagger.parameters['triage'] = {
            in: 'body',
            required: 'true',
            description: 'Triagem',
            type: 'object',
            schema: {
                "lembrar": "arrumarEsseJson"
            }

           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */

        let triage = req.body as Triage;
        triage = await Triage.save(triage);
        return res.status(HttpStatus.OK).json(triage);
    };

    private triageTypes = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Triage']
            #swagger.description = 'Tipos de traigem'
            #swagger.security = [{
                "ApiKeyAuth": []
            }
        */

        return res.status(HttpStatus.OK).send(TriageType);
    };
}
