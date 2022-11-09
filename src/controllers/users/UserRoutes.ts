import AbstractRoutes from '../AbstractRoutes';
import { Request, Response } from 'express';
import UserController from './UserController';

export default class UserRoutes extends AbstractRoutes {
    private readonly userController: UserController;

    constructor() {
        super();
        this.userController = new UserController();
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
        return this.userController.login(req, res, this.getJwt());
    };
}
