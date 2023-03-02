import { HttpStatus } from '../../AbstractHttpErrors';
import AbstractRoutes from '../../AbstractRoutes';
import { Request, Response } from 'express';
import { Baby } from '../../../entity/baby/Baby';
import { Guardian } from '../../../entity/guardian/Guardian';
import { Triage, TriageString, TriageType } from '../../../entity/triage/Triage';
import CryptoHelper from '../../../helpers/CryptoHelper';
import { ChildBirth, ChildBirthString } from '../../baby/BabyTypes';

export default class TriageController extends AbstractRoutes {

    constructor() {
        super();
        const { create, getAll, triageTypes } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, create);
        router.get('/', getAll);
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
            triageJson.baby.birthMother.password = CryptoHelper.encrypt(triageJson.baby.birthMother.password);
            triageJson.baby.birthMother = await Guardian.save(triageJson.baby.birthMother);

            for(let index = 0; index < triageJson.baby.guardians.length; index++) {
                triageJson.baby.guardians[index].login = triageJson.baby.guardians[index].name.toLowerCase().replaceAll(' ', '.');
                triageJson.baby.guardians[index].password = Buffer.from('p'+Math.random(), 'utf8').toString('base64').substring(0, 6);
                triageJson.baby.guardians[index].password = CryptoHelper.encrypt(triageJson.baby.guardians[index].password);
                triageJson.baby.guardians[index] = await Guardian.save(triageJson.baby.guardians[index]);
            }

            triageJson.baby.childBirthType = ChildBirth[triageJson.baby.childBirthType as ChildBirthString];
            triageJson.baby = await Baby.save(triageJson.baby);

            triageJson.indicators = triageJson.indicators.map((id: number) => ({ id }));

            triage = triageJson as Triage;
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ fancyMessage: 'Ocorreu um erro ao tentar criar a triagem', message: e.message });
        }

        try{
            triage = await Triage.save(triage);
            return res.status(HttpStatus.OK).json(triage);
        }catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ fancyMessage: 'Ocorreu um erro ao tentar criar a triagem', message: e.message });
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

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Triage']
           #swagger.description = 'Endpoint para pegar todas as triagens'
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

        try{

            let triageQuery = Triage.createQueryBuilder('triage')
                .select(['triage.leftEar AS leftEar', 'triage.rightEar AS rightEar',
                    'triage.evaluationDate AS evaluationDate', 'triage.type AS type',
                    'conduct.resultDescription AS conduct',
                    'institution.institutionName AS institution, conduct.testType AS testType'])
                .leftJoin('triage.conduct', 'conduct')
                .leftJoin('triage.institution', 'institution')
                .leftJoin('triage.therapist', 'therapist')
                .leftJoin('therapist.institutions', 'therapistInstitutions')
                .where('triage.institution = therapistInstitutions.id');

            if(req.query.rightEar){
                triageQuery = triageQuery.where('triage.rightEar = :rightEar', { rightEar: req.query.rightEar });
            }

            if(req.query.leftEar){
                triageQuery = triageQuery.andWhere('triage.leftEar = :leftEar', { leftEar: req.query.leftEar });
            }

            if(req.query.evaluationDate){
                triageQuery = triageQuery.andWhere('triage.evaluationDate like :evaluationDate', { evaluationDate: `%${req.query.evaluationDate}%` });
            }

            if(req.query.testType){
                triageQuery = triageQuery.andWhere('conduct.testType = :testType', { testType: req.query.testType });
            }

            return res.status(HttpStatus.OK).json(await triageQuery.getRawMany());
        } catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ fancyMessage: 'Ocorreu um erro ao tentar consultar as triagens', message: e });
        }
    };
}
