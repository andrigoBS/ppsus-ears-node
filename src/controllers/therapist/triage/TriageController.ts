import { Request, Response } from 'express';
import { Baby, ChildBirth, ChildBirthString } from '../../../entity/baby/Baby';
import { Guardian } from '../../../entity/guardian/Guardian';
import { Triage, TriageString, TriageType } from '../../../entity/triage/Triage';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';

export default class TriageController extends AbstractController {

    constructor() {
        super();
        const { create, triageTypes } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, create);
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

            triageJson.therapist = { id: req.body.jwtObject.id };

            triageJson.baby.birthMother.login = triageJson.baby.birthMother.name.toLowerCase().replaceAll(' ', '.');
            triageJson.baby.birthMother.password = Buffer.from('p'+Math.random(), 'utf8').toString('base64').substring(0, 6);
            triageJson.baby.birthMother = await Guardian.save(triageJson.baby.birthMother);

            for(let index = 0; index < triageJson.baby.guardians.length; index++) {
                triageJson.baby.guardians[index].login = triageJson.baby.guardians[index].name.toLowerCase().replaceAll(' ', '.');
                triageJson.baby.guardians[index].password = Buffer.from('p'+Math.random(), 'utf8').toString('base64').substring(0, 6);
                triageJson.baby.guardians[index] = await Guardian.save(triageJson.baby.guardians[index]);
            }

            triageJson.baby.childBirthType = ChildBirth[triageJson.baby.childBirthType as ChildBirthString];
            triageJson.baby = await Baby.save(triageJson.baby);

            triageJson.indicators = triageJson.indicators.map((id: number) => ({ id }));

            triage = triageJson as Triage;
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message, fancyMessage: 'Ocorreu um erro ao tentar criar a triagem' });
        }

        try{
            triage = await Triage.save(triage);
            return res.status(HttpStatus.OK).json(triage);
        }catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message, fancyMessage: 'Ocorreu um erro ao tentar criar a triagem' });
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
