import { Request, Response } from 'express';
import AbstractController from '../../AbstractController';
import { HttpStatus } from '../../../helpers/HttpStatus';
import { Orientation } from '../../../entity/orientation/Orientation';

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

        try{
            let orientation = req.body as Orientation;
            orientation.therapist = req.body.jwtObject.id;
            orientation = await Orientation.save(orientation);

            return res.status(HttpStatus.OK).json(orientation);
        } catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar a orientação' });
        }
    };

    private getAll = async (req: Request, res: Response) => {
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
        try{
            const orientation = await Orientation.createQueryBuilder('orientation')
                .select(['orientation.id AS id', 'orientation.description AS name', 'orientation.description AS description'])
                .where('orientation.therapist = :id', { id: req.body.jwtObject.id })
                .orWhere('orientation.therapist is null')
                .getRawMany();

            return res.status(HttpStatus.OK).json(orientation);
        } catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar consultar as orientações' });
        }
    };

}
