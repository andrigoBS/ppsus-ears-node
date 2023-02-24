import AbstractRoutes from '../../AbstractRoutes';
import { Request, Response } from 'express';
import EquipmentController from './EquipmentController';

export default class EquipmentRoutes extends AbstractRoutes {
    private equipmentController: EquipmentController;

    constructor() {
        super();

        this.equipmentController = new EquipmentController();

        const { create, deleteOne, getAll } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, create);
        router.get('/', verifyJWTMiddleware, getAll);
        router.delete('/:id', verifyJWTMiddleware, deleteOne);
    }


    private create = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Equipment']
            #swagger.description = 'Endpoint para criar um equipamento'
            #swagger.parameters['equipment'] = {
             in: 'body',
             required: 'true',
             description: 'Equipamento',
             type: 'object',
             schema: {
                 "lembrar": "arrumarEsseJson"
             }

            }
            #swagger.security = [{
                 "ApiKeyAuth": []
             }]
         */
        return this.equipmentController.create(req, res);
    };

    public getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Equipment']
           #swagger.description = 'Endpoint para pegar todos os equipamentos'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return this.equipmentController.getAll(req, res);
    };

    private deleteOne = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Equipment']
            #swagger.description = 'Endpoint para deletar um equipamento'
            #swagger.parameters['equipment'] = {
             in: 'body',
             required: 'true',
             description: 'Equipamento',
             type: 'object',
             schema: {
                 "lembrar": "arrumarEsseJson"
             }

            }
            #swagger.security = [{
                 "ApiKeyAuth": []
             }]
         */
        return this.equipmentController.deleteOne(req, res);
    };

}