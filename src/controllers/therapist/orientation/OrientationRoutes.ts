import AbstractRoutes from '../../AbstractRoutes';
import { Request, Response } from 'express';
import OrientationController from './OrientationController';

export default class OrientationRoutes extends AbstractRoutes {
    private orientationController: OrientationController;

    constructor() {
        super();

        this.orientationController = new OrientationController();

        const { create, getAll } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, create);
        router.get('/', verifyJWTMiddleware, getAll);
    }


    private create = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Orientation']
           #swagger.description = 'Endpoint para criar uma orientacao'
           #swagger.parameters['orientation'] = {
            in: 'body',
            required: 'true',
            description: 'Orientação',
            type: 'object',
            schema: {
                "lembrar": "arrumarEsseJson"
            }

           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.orientationController.create(req, res);
    };

    public getAll = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Orientation']
            #swagger.description = 'Endpoint para pegar todos as orientações'
            #swagger.parameters['orientation'] = {
             in: 'body',
             required: 'true',
             description: 'Orientação',
             type: 'object',
             schema: {
                 "lembrar": "arrumarEsseJson"
             }

            }
            #swagger.security = [{
                 "ApiKeyAuth": []
             }]
         */
        return this.orientationController.getAll(req, res);
    };
}