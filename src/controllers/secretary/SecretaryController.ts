import { HttpStatus } from '../AbstractHttpErrors';
import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import CityController from './CityController';
import StateController from './StateController';
import ZoneController from './ZoneController';

export default class SecretaryController extends AbstractRoutes {

    constructor() {
        super();
        const { getDashboard, getIsState } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();
        router.use('/state', new StateController().getRouter()
            // #swagger.tags = ['StateSecretary']
        );

        router.use('/zone', new ZoneController().getRouter()
            // #swagger.tags = ['ZoneSecretary']
        );

        router.use('/city', new CityController().getRouter()
            // #swagger.tags = ['CitySecretary']
        );

        router.get('/dashboard', verifyJWTMiddleware, getDashboard);
        router.get(':id/is-state', verifyJWTMiddleware, getIsState);
    }

    private getDashboard = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Secretary']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de uma secretaria'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return res.status(HttpStatus.OK).json([
            { type: 'baby-pass-fail' },
            // { type: 'baby-come-born' },
            { type: 'indicators-percent' },
            { type: 'indicators' }
        ]);
    };

    private getIsState = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Secretary']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de uma secretaria'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const user = await SecretaryUser.createQueryBuilder('u')
            .where('u.id = :id', { id: req.params.id })
            .select(['u.state AS state'])
            .limit(1)
            .execute()
        ;
        return res.status(HttpStatus.OK).json(user.state !== null);
    };
}
