import AbstractController from '../AbstractController';
import { Request, Response } from 'express';
import { JwtAuth } from '../../middleware/JwtAuth';
import { AuthUserError } from './UserErrors';
import UserService from './UserService';
import { AuthUser, User } from './UserTypes';

export default class UserController extends AbstractController{
    private readonly userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    public async login(req: Request, res: Response, jwt: JwtAuth) {
        const validateParams = {};

        return super.genericProcess<never>(req, res, validateParams, async () => {
            const authObj: AuthUser = this.basicAuthToObj(req.headers['authorization']);

            const user: User = await this.userService.findOne(req.params.userType, authObj);

            const token = jwt.createJWToken({ id: user.id });

            return { token, user: user };
        });
    }

    private basicAuthToObj(bearerHeader?: string): AuthUser {
        if (!bearerHeader) {
            throw new AuthUserError();
        }

        const [login, password] = Buffer.from(bearerHeader.replace('Basic ', ''), 'base64').toString().split(':');

        return { login, password };
    }
}
