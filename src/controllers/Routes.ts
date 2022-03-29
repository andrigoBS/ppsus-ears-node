import {Router} from 'express'
import SecretaryController from "./secretary/SecretaryController";
import AbstractController from "./AbstractController";
import ReferralServiceController from "./service/ReferralServiceController";

export default class Routes extends AbstractController {

    constructor() {
        super()
        const router = this.getRouter()
        router.use('/secretary', new SecretaryController().getRouter())
        router.use('/referral-service', new ReferralServiceController().getRouter())
    }

}
