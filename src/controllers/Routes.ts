import {Router} from 'express'
import SecretaryController from "./secretary/SecretaryController";

export default class Routes {
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.router.use('/secretary', new SecretaryController().getRouter())
        this.router.get('/institution', ((req, res) => {
            return res.json({message: "CADE O TEU PHP AGORA?"});
        }))
    }

    public getRouter(): Router{
        return this.router
    }
}
