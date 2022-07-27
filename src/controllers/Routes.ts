import AbstractController from './AbstractController';
import BabyController from './baby/BabyController';
import InstitutionController from './institution/InstitutionController';
import ParentsController from './parents/ParentsController';
import ReferralServiceController from './referral_service/ReferralServiceController';
import ReportsController from './reports/ReportsController';
import SecretaryController from './secretary/SecretaryController';

export default class Routes extends AbstractController {

    constructor() {
        super();
        const router = this.getRouter();
        router.use('/baby', new BabyController().getRouter());
        router.use('/institution', new InstitutionController().getRouter());
        router.use('/parents', new ParentsController().getRouter());
        router.use('/referral-service', new ReferralServiceController().getRouter());
        router.use('/reports', new ReportsController().getRouter());
        router.use('/secretary', new SecretaryController().getRouter());
    }

}
