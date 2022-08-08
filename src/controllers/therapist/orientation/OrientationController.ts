import { Request, Response } from 'express';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';
import {Orientation} from "../../../entity/orientation/Orientation";

export default class OrientationController extends AbstractController {

    constructor() {
        super();
        const { create } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.post('/', verifyJWTMiddleware, create);
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

        console.log(req.params.id, req.body);
        let orientation = req.body as Orientation;
        orientation = await Orientation.save(orientation);
        return res.status(HttpStatus.OK).json(orientation);
    };

}
