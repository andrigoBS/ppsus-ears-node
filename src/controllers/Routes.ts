import {Router} from 'express'
import SecretaryController from "./secretary/SecretaryController";

export default class Routes {
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.router.use('/secretary', new SecretaryController().getRouter())
    }

    public getRouter(): Router{
        return this.router
    }
}
