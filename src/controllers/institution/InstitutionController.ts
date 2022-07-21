import { Request, Response } from 'express';
import { HttpStatus } from '../../helpers/HttpStatus';
import AbstractController from '../AbstractController';
import { Institution } from '../../entity/institution/Institution';

export default class InstitutionController extends AbstractController
{

    constructor()
    {
        super();
        const { createService } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', createService);
    }

    private createService = async (req: Request, res: Response) =>
    {
        /*
           #swagger.tags = ['ReferralService']
           #swagger.description = 'Endpoint para recuperar todos os serviços de referencia'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */

        let institution = req.body as Institution
        institution = await Institution.save(institution);
        return res.status(HttpStatus.OK).json(institution);
    }
}
