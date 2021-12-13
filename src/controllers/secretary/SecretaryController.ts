import {Router} from 'express'
import ReferralServiceController from "./referral_service/ReferralServiceController"

export default class SecretaryController{
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.router.use('/referral-service', new ReferralServiceController().getRouter())
    }

    public getRouter(): Router{
        return this.router
    }
}
