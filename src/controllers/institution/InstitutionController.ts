import { Institution, InstitutionString, InstitutionType, } from '../../entity/institution/Institution';
import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import InstitutionRepository from './InstitutionRepository';

export default class InstitutionController extends AbstractController {
    private readonly institutionRepository = new InstitutionRepository();

    constructor() {
        super();
        const { create, getOne, institutionTypes, getDashboard } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', create);
        router.get('/types', institutionTypes);
        router.get('/dashboard', verifyJWTMiddleware, getDashboard);
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

        let institution: Institution;

        try{
            const institutionJson = req.body;
            institutionJson.institutionType = InstitutionType[institutionJson.institutionType as InstitutionString];
            institution = institutionJson as Institution;
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
        }

        try{
            const institution2 = await this.institutionRepository.findIdsSimilar(institution, 1);
            if(institution2 && institution2.length !== 0){
                return res.status(HttpStatus.BAD_REQUEST).json({ message: { id: institution2[0].id }, fancyMessage: 'Já existe um usuario com esse login' });
            }
        }catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
        }

        try{
            institution = await this.institutionRepository.save(institution);
            return res.status(HttpStatus.OK).json(institution);
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

    private institutionTypes = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Institution']
            #swagger.description = 'Tipos de instituição'
            #swagger.security = [{
                "ApiKeyAuth": []
            }
        */
        return res.status(HttpStatus.OK).send(InstitutionType);
    };
}
