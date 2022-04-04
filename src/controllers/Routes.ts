import SecretaryController from "./secretary/SecretaryController";
import AbstractController from "./AbstractController";
import ReferralServiceController from "./referral_service/ReferralServiceController";
import ParentsController from "./parents/ParentsController";

export default class Routes extends AbstractController {

    constructor() {
        super()
        const router = this.getRouter()
        router.use('/secretary', new SecretaryController().getRouter())
        router.use('/referral-service', new ReferralServiceController().getRouter())
        router.use('/parents', new ParentsController().getRouter())
    }

}
