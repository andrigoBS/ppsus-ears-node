import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import BabyController from './BabyController';

export default class BabyRoutes extends AbstractRoutes {
    private babyController: BabyController;

    constructor() {
        super();

        this.babyController = new BabyController();

        const { getAllBabies, listChildBirthTypes } = this;
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
        return this.babyController.listChildBirthTypes(req, res);
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
        return this.babyController.getAllBabies(req, res);
    };
}
