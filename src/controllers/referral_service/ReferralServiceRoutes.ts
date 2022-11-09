import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import ReferralServiceController from './ReferralServiceController';

export default class ReferralServiceRoutes extends AbstractRoutes {
    private readonly referralServiceController: ReferralServiceController;

    constructor() {
        super();
        this.referralServiceController = new ReferralServiceController();

        const { create, listType } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.get('/types', verifyJWTMiddleware, listType);
        router.post('/', verifyJWTMiddleware, create);
    }

    private create = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['ReferralService']
            #swagger.description = 'Endpoint para adicionar um serviço de referencia'
            #swagger.parameters['referralService'] = {
               in: 'body',
               required: 'true',
               description: 'Nome e telefone do contado',
               type: 'object',
                schema: {name: 'João S. da Silva', cellphone: '554130306905'}
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.referralServiceController.create(req, res);
    };

    private listType = async (req: Request, res: Response) => {
        /*
               #swagger.tags = ['ReferralService']
               #swagger.description = 'Tipos de serviço de referencia'
               #swagger.security = [{
                    "ApiKeyAuth": []
                }]
        */
        return this.referralServiceController.listType(req, res);
    };
}
