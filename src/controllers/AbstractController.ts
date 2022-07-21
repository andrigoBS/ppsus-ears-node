import { JwtAuth } from '../middleware/JwtAuth';
import { Router } from 'express';

export default abstract class AbstractController {

    private readonly router = Router();

    private readonly jwt = new JwtAuth();

    public getJwt() {
        return this.jwt;
    }

    public getRouter() {
        return this.router;
    }

}
