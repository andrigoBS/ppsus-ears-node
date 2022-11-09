import { Router } from 'express';
import { JwtAuth } from '../middleware/JwtAuth';

export default abstract class AbstractRoutes {

    private readonly router = Router();

    private readonly jwt = new JwtAuth();

    public getJwt() {
        return this.jwt;
    }

    public getRouter() {
        return this.router;
    }

}
