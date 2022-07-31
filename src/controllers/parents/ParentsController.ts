import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import LoginHelper from '../../helpers/LoginHelper';

export default class ParentsController extends AbstractController {

    constructor() {
        super();
        const { login } = this;
        const router = this.getRouter();
        router.post('/user/login', login);
    }

    private login = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Parents']
            #swagger.description = 'Endpoint para logar um usuario pai'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */

        const user = req.body.name === 'test' && req.body.password === 'mock'? { id: 100 } : null;
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: 'User not found' });
        }
        const token = this.getJwt().createJWToken({ id: user.id });
        return res.status(HttpStatus.OK).send({ message: 'Created Token', body: { token, user: { name: 'Teste' } } });
    };

}
