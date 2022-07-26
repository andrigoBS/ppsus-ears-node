import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import { Institution } from '../../entity/institution/Institution';

export default class InstitutionController extends AbstractController {

    constructor() {
        super();
        const { createService } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', createService);
    }

    private createService = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['ReferralService']
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
}
