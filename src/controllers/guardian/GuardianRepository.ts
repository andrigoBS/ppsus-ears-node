import { Guardian } from '../../entity/guardian/Guardian';

export default class GuardianRepository {
    public async save(guardian: Guardian): Promise<Guardian> {
        return Guardian.save(guardian);
    }
}
