import AbstractRoutes from './AbstractRoutes';
import BabyRoutes from './baby/BabyRoutes';
import InstitutionRoutes from './institution/InstitutionRoutes';
import ParentsRoutes from './parents/ParentsRoutes';
import ReferralServiceRoutes from './referral_service/ReferralServiceRoutes';
import ReportsRoutes from './reports/ReportsRoutes';
import SecretaryController from './secretary/SecretaryController';
import TherapistController from './therapist/TherapistController';
import UserRoutes from './users/UserRoutes';

export default class Routes extends AbstractRoutes {

    constructor() {
        super();
        const router = this.getRouter();
        router.use('/baby', new BabyRoutes().getRouter());
        router.use('/institution', new InstitutionRoutes().getRouter());
        router.use('/parents', new ParentsRoutes().getRouter());
        router.use('/referral-service', new ReferralServiceRoutes().getRouter());
        router.use('/reports', new ReportsRoutes().getRouter());
        router.use('/secretary', new SecretaryController().getRouter());
        router.use('/therapist', new TherapistController().getRouter());
        router.use('/user', new UserRoutes().getRouter());
    }

}
