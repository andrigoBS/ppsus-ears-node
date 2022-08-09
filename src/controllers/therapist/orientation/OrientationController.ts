import { Request, Response } from 'express';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';
import {Orientation} from "../../../entity/orientation/Orientation";

export default class OrientationController extends AbstractController {

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

        let orientation = req.body as Orientation;
        orientation.therapist = req.body.jwtObject.id;
        orientation = await Orientation.save(orientation);
        return res.status(HttpStatus.OK).json(orientation);
    };

    private getAll = async (req: Request, res: Response) => {
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

        console.log("AAAAAAAA", req.body)

        let orientation = await Orientation.find(req.body);
        return res.status(HttpStatus.OK).json(orientation);
    };

}
