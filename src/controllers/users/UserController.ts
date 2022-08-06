import { Guardian } from '../../entity/guardian/Guardian';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import { Therapist } from '../../entity/therapist/Therapist';
import { AuthUser, LoginHelper } from '../../helpers/LoginHelper';
import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import { getRepository } from 'typeorm';

type UserString = 'secretary'   | 'institution'   | 'therapist' | 'parents';
type User       = SecretaryUser | InstitutionUser | Therapist   | Guardian | undefined;
enum MappingUser {
    secretary = 'SecretaryUser',
    institution = 'InstitutionUser',
    therapist = 'Therapist',
    parents = 'Guardian',
}

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

        const user: User = await this.findOne(req.params.userType, authObj);

        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send({ fancyMessage: 'Usuário não encontrado, register ou senha incorreto', message: 'Not Found' });
        }

        const token = this.getJwt().createJWToken({ id: user.id });
        return res.status(HttpStatus.OK).send({ message: 'Created Token', fancyMessage: 'OK', token, user: { ...user, password: undefined } });
    };

    private async findOne(userType: string, authObj: AuthUser): Promise<User> {
        return getRepository<User>(MappingUser[userType as UserString]).findOne(authObj);
    }
}
