import { Request, Response } from 'express';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';
import {Conduct} from "../../../entity/conduct/Conduct";
import {TriageString, TriageType} from "../../../entity/triage/Triage";

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

        // console.log(req.params.id, req.body);
        let conduct: Conduct;

        try{
            const conductJson = req.body;
            conductJson.type = TriageType[conductJson.type as TriageString];
            conduct = conductJson as Conduct;
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
        }

        conduct = req.body as Conduct;
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

        let conduct = await Conduct.find();
        return res.status(HttpStatus.OK).json(conduct);
    };

}
