import { Guardian } from '../../entity/guardian/Guardian';
import CryptoHelper from '../../helpers/CryptoHelper';
import GuardianRepository from './GuardianRepository';
import dataSource from '../../config/DataSource';

export default class GuardianService {
    private guardianRepository: GuardianRepository;

    constructor() {
        this.guardianRepository = new GuardianRepository();
    }

    public async bulkCreate(guardians: Guardian[], generateUser: boolean): Promise<Guardian[]> {
        const promiseGuardians: Promise<Guardian>[] = [];
        for(let index = 0; index < guardians.length; index++) {
            promiseGuardians.push(this.create(guardians[index], generateUser));
        }
        return Promise.all(promiseGuardians);
    }

    public async create(guardian: Guardian, generateUser: boolean): Promise<Guardian> {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        const manager = queryRunner.manager;
        try {
            if(generateUser) {
                guardian.login = this.createUserName(guardian.name, guardian.birthDate);
                guardian.password = CryptoHelper.encrypt(this.createPassword());
            }
            guardian = await this.guardianRepository.save(guardian, manager);
            guardian.emails = await this.guardianRepository.saveEmails(guardian.id, guardian.emails as unknown as string[], manager);
            guardian.phones = await this.guardianRepository.savePhones(guardian.id, guardian.phones as unknown as string[], manager);

            await queryRunner.commitTransaction();
            return guardian;
        }catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }

    private createUserName(name: string, birthDate: Date): string {
        const birthDateSliced = birthDate.toString().split('-');
        return name.toLowerCase().replaceAll(' ', '.') + birthDateSliced[2] + birthDateSliced[1] + birthDateSliced[0];
    }

    private createPassword(): string {
        return Buffer.from('p'+Math.random(), 'utf8').toString('base64').substring(0, 6);
    }
}
