import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import InstitutionController from './InstitutionController';

export default class InstitutionRoutes extends AbstractRoutes {
    private institutionController = new InstitutionController();

    constructor() {
        super();
        const { create, getAll, getDashboard, getInstitutionTypes, getOne } = this;
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
        return this.institutionController.create(req, res);
    };

    private getOne = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar uma instituição'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.institutionController.getOne(req, res);
    };

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar uma instituição'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.institutionController.getAll(req, res);
    };

    private getDashboard = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de uma instituição'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.institutionController.getDashboard(req, res);
    };

    private getInstitutionTypes = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Institution']
            #swagger.description = 'Tipos de instituição'
            #swagger.security = [{
                "ApiKeyAuth": []
            }
        */
        return this.institutionController.getInstitutionTypes(req, res);
    };
}
