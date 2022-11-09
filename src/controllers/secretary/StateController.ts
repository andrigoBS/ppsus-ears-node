import { HttpStatus } from '../AbstractHttpErrors';
import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import { State } from '../../entity/secretaries/State';
import SecretaryService from './SecretaryService';

export default class StateController extends AbstractRoutes {

    constructor() {
        super();
        const { getAll, getById, updateSecretary } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.get('/', getAll);
        router.get('/:id', getById);
        router.put('/:id', verifyJWTMiddleware, updateSecretary);
    }

    private getAll = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar todas as secretarias de estado'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const states = await State.createQueryBuilder('s')
            .select(['s.id AS id', 's.name AS name'])
            .execute()
        ;
        return res.status(HttpStatus.OK).json(states);
    };

    private getById = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar uma secretaria do estado pelo id'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const state = await State.findOne(req.params.id);
        if (!state) {
            res.status(HttpStatus.NOT_FOUND).json({ message: 'ID não encontrado' });
        }
        return res.status(HttpStatus.OK).json({ state });
    };

    private updateSecretary = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para atualizar uma secretaria do estado pelo id'
           #swagger.parameters['secretary'] = {
               in: 'body',
               required: 'true',
               description: 'Secretaria',
               schema: {$ref: '#/definitions/Secretary'}
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const { emails, name } = req.body;
        const id = Number(req.params.id);
        const state = await State.findOne(id);
        const [status, response] = await SecretaryService.saveSecretary(state, { emails, name });
        return res.status(status as HttpStatus).json(response);
    };
}
