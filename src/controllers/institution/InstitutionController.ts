import { Institution, InstitutionString, InstitutionType, } from '../../entity/institution/Institution';
import { Request, Response } from 'express';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import InstitutionRepository from './InstitutionRepository';

export default class InstitutionController extends AbstractController {
    private readonly institutionRepository = new InstitutionRepository();

    constructor() {
        super();
        const { create, getOne, getAll, getInstitutionTypes, getDashboard } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', create);
        router.get('/types', getInstitutionTypes);
        router.get('/dashboard', verifyJWTMiddleware, getDashboard);
        router.get('/', getAll);
        router.get('/:id', getOne);
    }

    private create = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar todos os serviços de referencia'
           #swagger.parameters['institution'] = {
            in: 'body',
            required: 'true',
            description: 'Instituição',
            type: 'object',
            schema: {
                "institutionName": "nome instituicao",
                "password": "senha",
                "cnes": "numero cnes",
                "cnpj": "cnpj",
                "institutionType": 2,
                "email": "example@gmail.com",
                "alternativeEmail": "example2@gmail.com",
                "institutionPhone": "123435",
                "institutionalCellphone": "123435",
                "cep": "33232",
                "publicArea": "logradouro",
                "state": "sc",
                "city":  "floripa",
                "number": "3242",
                "complement": "complemento",
                "responsibleName": "nome responsavel",
                "responsibleRole": "cargo do responsavel"
            }

           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */

        const institutionUserJson = req.body;

        let institutionUser: InstitutionUser;

        if(!institutionUserJson.institution){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Institution Not Found', fancyMessage: 'Não foi possivel recuperar a instituição' });
        }

        if(!institutionUserJson.institution.id){
            try{
                institutionUserJson.institution.institutionType = InstitutionType[institutionUserJson.institution.institutionType as InstitutionString];
            }catch (e: any){
                return res.status(HttpStatus.BAD_REQUEST).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
            }

            try{
                const institution2 = await this.institutionRepository.findIdsSimilar(institutionUserJson.institution, 1);
                if(institution2 && institution2.length !== 0){
                    return res.status(HttpStatus.BAD_REQUEST).json({ message: { id: institution2[0].id }, fancyMessage: 'Já existe um usuario com esse login' });
                }
            }catch (e: any) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
            }

            const institution = await this.institutionRepository.save(institutionUserJson.institution as Institution);
            institutionUserJson.institution = institution.id;
        }

        institutionUser = institutionUserJson as InstitutionUser;

        try{
            institutionUser = await this.institutionRepository.saveUser(institutionUser);
            return res.status(HttpStatus.OK).json(institutionUser);
        }catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
        }
    };

    private getOne = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar uma instituição'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const institution = await this.institutionRepository.findOne({ id: req.params.id });
        if(!institution) {
            return res.status(HttpStatus.NOT_FOUND).send({ fancyMessage: 'Instituição não encontrada', message: 'Not Found' });
        }
        return res.status(HttpStatus.OK).json(institution);
    };

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar uma instituição'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const institution = await this.institutionRepository.findAll();
        if(!institution) {
            return res.status(HttpStatus.NOT_FOUND).send({ fancyMessage: 'Instituição não encontrada', message: 'Not Found' });
        }
        return res.status(HttpStatus.OK).json(institution);
    };

    private getDashboard = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de uma instituição'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return res.status(HttpStatus.OK).json([
            { type: 'baby-pass-fail' },
            { type: 'baby-come-born' },
            { type: 'indicators-percent' },
            { type: 'indicators' }
        ]);
    };

    private getInstitutionTypes = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Institution']
            #swagger.description = 'Tipos de instituição'
            #swagger.security = [{
                "ApiKeyAuth": []
            }
        */
        const institutionTypes = Object.keys(InstitutionType).map((key) => (
            { id: key, name: InstitutionType[key as InstitutionString] }
        ));
        return res.status(HttpStatus.OK).send(institutionTypes);
    };
}
