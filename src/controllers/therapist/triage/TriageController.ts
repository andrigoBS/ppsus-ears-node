import { Request, Response } from 'express';
import { Triage, TriageString, TriageType } from '../../../entity/triage/Triage';
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

        let triage = null;

        try{
            const triageJson = req.body;
            triageJson.type = TriageType[triageJson.type as TriageString];

            triage = triageJson as Triage;
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar a triagem' });
        }

        try{
            triage = await Triage.save(triage);
            return res.status(HttpStatus.OK).json(triage);
        }catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar a triagem' });
        }
    };

    private triageTypes = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Triage']
            #swagger.description = 'Tipos de triagem'
            #swagger.security = [{
                "ApiKeyAuth": []
            }
        */
        const triageType = Object.keys(TriageType).map((key) => (
            { id: key, name: TriageType[key as TriageString] }
        ));
        return res.status(HttpStatus.OK).send(triageType);
    };
}
