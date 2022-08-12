import { Request, Response } from 'express';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';
import {Equipment} from "../../../entity/equipment/Equipment";

export default class EquipmentController extends AbstractController {

    constructor() {
        super();
        const { create, getAll } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, create);
        router.get('/', verifyJWTMiddleware, getAll);

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

        let equipment = req.body as Equipment;

        equipment = await Equipment.save(equipment);
        return res.status(HttpStatus.OK).json(equipment);
    };

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Equipment']
           #swagger.description = 'Endpoint para pegar todos os equipamentos'
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

        const equipment = await Equipment.find();
        return res.status(HttpStatus.OK).json(equipment);
    };

}
