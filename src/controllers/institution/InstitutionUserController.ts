import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';

export default class InstitutionUserController extends AbstractController {

    constructor() {
        super();
        const { login } = this;
        const router = this.getRouter();
        router.post('/login', login);
    }

    private login = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['InstitutionUser']
            #swagger.description = 'Endpoint para logar um usuario instituição'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */

        // let authObj = {};
        //
        // try {
        //     authObj = LoginHelper.basicAuthToObj(req.headers['authorization']);
        // } catch (e: any) {
        //     return res.status(HttpStatus.UNAUTHORIZED).send({ message: e.message });
        // }
        // const user = await InstitutionUser.findOne(authObj);

        const user = req.body.name === 'test' && req.body.password === 'mock'? { id: 100 } : null;
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: 'User not found' });
        }
        const token = this.getJwt().createJWToken({ id: user.id });
        return res.status(HttpStatus.OK).send({ message: 'Created Token', body: { token, user: { name: 'Teste' } } });
    };
}
