import {Router} from 'express'
import SecretaryController from "./secretary/SecretaryController";
import ParentsController from "./parents/ParentsController";

export default class Routes {
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.router.use('/secretary', new SecretaryController().getRouter())
        this.router.use('/parents', new ParentsController().getRouter())
    }

    public getRouter(): Router{
        return this.router
    }
}
