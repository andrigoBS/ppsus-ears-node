import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import LoginHelper from '../../helpers/LoginHelper';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import SecretaryUserController from './SecretaryUserController';
import StateController from './StateController';
import ZoneController from './ZoneController';

export default class SecretaryController extends AbstractController {

    constructor() {
        super();
        const { login, getDashboard } = this;
        const router = this.getRouter();
        router.use('/state', new StateController().getRouter()
            // #swagger.tags = ['StateSecretary']
        );

        router.use('/zone', new ZoneController().getRouter()
            // #swagger.tags = ['ZoneSecretary']
        );

        router.use('/user', new SecretaryUserController().getRouter()
            // #swagger.tags = ['SecretaryUser']
        );
        router.post('/login', login);
        router.get('/dashboard', getDashboard);
    }

    // Todo mover para controller de usuário quando criado
    private login = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Secretary']
            #swagger.description = 'Endpoint para logar um usuario secretaria'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */

        let authObj = {};

        try {
            authObj = LoginHelper.basicAuthToObj(req.headers['authorization']);
        } catch (e: any) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: e.message });
        }
        const user = await SecretaryUser.findOne(authObj);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: 'User not found' });
        }
        const token = this.getJwt().createJWToken({ id: user.id });
        return res.status(HttpStatus.OK).send({ message: 'Created Token', body: { token, user: { name: 'Deveria ter um nome?' } } });
    };

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
            { type: 'baby-come-born' },
            { type: 'indicators-percent' },
            { type: 'indicators' }
        ]);
    };
}
