import { HttpError, HttpStatus } from '../AbstractHttpErrors';
import { Request, Response } from 'express';
import { JwtAuth } from '../../middleware/JwtAuth';
import { AuthUserError } from './UserErrors';
import UserService from './UserService';
import { AuthUser, User } from './UserTypes';

export default class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async login(req: Request, res: Response, jwt: JwtAuth) {
        try{
            const authObj: AuthUser = this.basicAuthToObj(req.headers['authorization']);

            const user: User = await this.userService.findOne(req.params.userType, authObj);

            const token = jwt.createJWToken({ id: user.id });

            return res.status(HttpStatus.OK).send({ token, user: user });

        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    private basicAuthToObj(bearerHeader?: string): AuthUser {
        if (!bearerHeader) {
            throw new AuthUserError();
        }

        const [login, password] = Buffer.from(bearerHeader.replace('Basic ', ''), 'base64').toString().split(':');

        return { login, password };
    }
}
