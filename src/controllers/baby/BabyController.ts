import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import {Baby, ChildBirth, ChildBirthString} from '../../entity/baby/Baby';
import { HttpStatus } from '../../helpers/HttpStatus';

export default class BabyController extends AbstractController {

    constructor() {
        super();
        const { listChildBirthTypes, getAllBabies } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.get('/birth-types', verifyJWTMiddleware, listChildBirthTypes);
        router.get('/', verifyJWTMiddleware, getAllBabies);
    }

    private listChildBirthTypes = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Baby']
            #swagger.description = 'Tipo de parto'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */
        const childBirthTypes = Object.keys(ChildBirth).map((key) => (
            { id: key, name: ChildBirth[key as ChildBirthString] }
        ));
        return res.status(HttpStatus.OK).send(childBirthTypes);
    };

    private getAllBabies = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Baby']
           #swagger.description = 'Endpoint para pegar todos os bebês'
           #swagger.parameters['baby'] = {
            in: 'body',
            required: 'true',
            description: 'Bebê',
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
            const baby = await Baby.createQueryBuilder('baby')
                .select(['baby.id AS id', 'baby.name AS name', 'baby.weight AS weight',
                    'baby.height AS height', 'baby.circumference AS circumference',
                    'baby.birthDate AS birthDate', 'baby.gestationalAge AS gestationalAge',
                    'baby.childBirthType AS childBirthType', 'baby.birthMother AS birthMother'])
                // .where('baby.therapist = :id', { id: req.body.jwtObject.id })
                // .orWhere('baby.therapist is null')
                .getRawMany();
            return res.status(HttpStatus.OK).json(baby);
        } catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e, fancyMessage: 'Ocorreu um erro ao consultar os bebês' });
        }
    };
}
