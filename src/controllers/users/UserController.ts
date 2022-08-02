import { AuthUser, LoginHelper } from '../../helpers/LoginHelper';
import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import { UserTemplate } from '../../entity/decorators/templates/UserTemplate';
import { getRepository } from 'typeorm';

//TODO: colocar todos os tipos de user aqui
type User = SecretaryUser | UserTemplate | undefined;

export default class UserController extends AbstractController {
    constructor() {
        super();
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

        //TODO: remover mock, ativar register definitivo
        const user = authObj.login === 'test.mock' && authObj.password === 'test123'? { id: 10, name: 'Teste' } : null;
        //const user: User = await this.findOne(req.params.userType, authObj);

        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send({ fancyMessage: 'Usuário não encontrado, register ou senha incorreto', message: 'Not Found' });
        }

        const token = this.getJwt().createJWToken({ id: user.id });
        return res.status(HttpStatus.OK).send({ message: 'Created Token', fancyMessage: 'OK', token, user: { ...user, password: undefined, id: undefined } });
    };

    private async findOne(userType: string, authObj: AuthUser) : Promise<User> {
        const repositoryName = this.toCamelCase(userType)+'User';
        return getRepository<User>(repositoryName).findOne(authObj);
    }

    private toCamelCase(value: string): string {
        const upperCaseFirstCharUserType = value.charAt(0).toUpperCase();
        const withoutFirstCharUserType = value.substring(1);
        return upperCaseFirstCharUserType + withoutFirstCharUserType;
    }
}
