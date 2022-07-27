import { Institution, InstitutionType, } from '../../entity/institution/Institution';
import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';

export default class InstitutionController extends AbstractController {

    constructor() {
        super();
        const { createService, institutionTypes, getDashboard } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', createService);
        router.get('/types', institutionTypes);
        router.get('/dashboard', getDashboard);
    }

    private createService = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Institution']
           #swagger.description = 'Endpoint para recuperar todos os serviços de referencia'
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
