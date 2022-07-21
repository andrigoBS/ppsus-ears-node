import { Request, Response } from 'express';
import { HttpStatus } from '../../helpers/HttpStatus';
import AbstractController from '../AbstractController';

export default class ReferralServiceController extends AbstractController {

    constructor() {
        super();
        const { getAll, getById, createService, updateService, deleteService } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.get('/', verifyJWTMiddleware, getAll);
        router.post('/', verifyJWTMiddleware, createService);

        router.get('/:id', verifyJWTMiddleware, getById);
        router.put('/:id', verifyJWTMiddleware, updateService);
        router.delete('/:id', verifyJWTMiddleware, deleteService);

    }

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['ReferralService']
           #swagger.description = 'Endpoint para recuperar todos os serviços de referencia'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return res.status(HttpStatus.OK).send({ message: 'respond with a resource' });
    };

    private getById = async (req: Request, res: Response) => {
        /*
               #swagger.tags = ['ReferralService']
               #swagger.description = 'Endpoint para recuperar um serviço de referencia pelo id'
               #swagger.security = [{
                    "ApiKeyAuth": []
                }]
            */
        return res.status(HttpStatus.OK).send({ message: 'respond with a resource' });
    };

    private createService = async (req: Request, res: Response) => {
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
        const { name, cellphone, jwtObject } = req.body;

        return res.status(HttpStatus.OK).send({ message: 'respond with a resource' });
    };

    private updateService = async (req: Request, res: Response) => {

        /*
            #swagger.tags = ['ReferralService']
            #swagger.description = 'Endpoint para atualizar um serviço de referencia'
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
        const { name, cellphone, jwtObject } = req.body;

        return res.status(HttpStatus.OK).send({ message: 'respond with a resource' });
    };

    private deleteService = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['ReferralService']
           #swagger.description = 'Endpoint para deletar um serviço de referencia pelo id'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */

        return res.status(HttpStatus.OK).send({ message: 'respond with a resource' });
    };
}
