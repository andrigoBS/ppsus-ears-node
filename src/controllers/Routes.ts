import AbstractController from './AbstractController';
import InstitutionController from './institution/InstitutionController';
import ParentsController from './parents/ParentsController';
import ReferralServiceController from './referral_service/ReferralServiceController';
import SecretaryController from './secretary/SecretaryController';

export default class Routes extends AbstractController {

    constructor() {
        super();
        const router = this.getRouter();
        router.use('/secretary', new SecretaryController().getRouter());
        router.use('/institution', new InstitutionController().getRouter());
        router.use('/referral-service', new ReferralServiceController().getRouter());
        router.use('/parents', new ParentsController().getRouter());
    }

}
