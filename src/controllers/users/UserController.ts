import { Request, Response } from 'express';
import { HttpStatus } from '../../helpers/HttpStatus';
import { AuthUser, LoginHelper } from '../../helpers/LoginHelper';
import AbstractController from '../AbstractController';
import { User, UserRepository } from './UserRepository';

export default class UserController extends AbstractController {
    private readonly repository: UserRepository;

    constructor() {
        super();
        this.repository = new UserRepository();
        const { login } = this;
        const router = this.getRouter();
        router.post('/:userType/login', login);
    }

    private login = async (req: Request, res: Response) => {
        /*
            #swagger.description = 'Endpoint para logar um usuario'
            #swagger.security = [{
                "basicApiKeyAuth": []
            }
        */

        let authObj: AuthUser;

        try {
            authObj = LoginHelper.basicAuthToObj(req.headers['authorization']);
        } catch (e: any) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: e.message, fancyMessage: 'Usuario não autorizado, contate um administrador' });
        }

        const users: User[] = await this.repository.findOne(req.params.userType, authObj);

        if (!users || users.length !== 1 || !users[0]) {
            return res.status(HttpStatus.NOT_FOUND).send({ fancyMessage: 'Usuário não encontrado, register ou senha incorreto', message: 'Not Found' });
        }

        const user: User = users[0];

        const token = this.getJwt().createJWToken({ id: user.id });
        return res.status(HttpStatus.OK).send({ message: 'Created Token', fancyMessage: 'OK', token, user: user });
    };
}
