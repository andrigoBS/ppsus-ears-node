import { Institution, InstitutionType, } from '../../entity/institution/Institution';
import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';

export default class InstitutionController extends AbstractController {

    constructor() {
        super();
        const { create, institutionTypes, getDashboard } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', create);
        router.get('/types', institutionTypes);
        router.get('/dashboard', verifyJWTMiddleware, getDashboard);
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

        let institution = req.body as Institution;
        institution = await Institution.save(institution);
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
