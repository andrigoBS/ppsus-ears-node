import { HttpStatus } from '../../helpers/http/AbstractHttpErrors';
import { IncomingHttpHeaders } from 'http';
import { JwtAuth } from '../../helpers/JwtAuth';
import { AuthUserError } from './UserErrors';
import UserService from './UserService';
import { AuthUser, User } from './UserTypes';

export default class UserController {
    public async login(params: {userType: string}, headers: IncomingHttpHeaders) {
        const userService = new UserService();

        const authObj: AuthUser = this.basicAuthToObj(headers['authorization']);
        const user: User = await userService.findOne(params.userType, authObj);

        const token = new JwtAuth().createJWToken({ id: user.id });
        const result = { token, user: user };

        return { httpStatus: HttpStatus.OK, result };
    }

    private basicAuthToObj(bearerHeader?: string): AuthUser {
        if (!bearerHeader) {
            throw new AuthUserError();
        }

        const [login, password] = Buffer.from(bearerHeader.replace('Basic ', ''), 'base64').toString().split(':');

        return { login, password };
    }
}
