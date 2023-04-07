import { Guardian } from '../../entity/guardian/Guardian';
import CryptoHelper from '../../helpers/CryptoHelper';
import GuardianRepository from './GuardianRepository';

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
        if(generateUser) {
            guardian.login = this.createUserName(guardian.name, guardian.birthDate);
            guardian.password = CryptoHelper.encrypt(this.createPassword());
        }
        return this.guardianRepository.save(guardian);
    }

    private createUserName(name: string, birthDate: Date): string {
        const birthDateSliced = birthDate.toString().split('-');
        return name.toLowerCase().replaceAll(' ', '.') + birthDateSliced[2] + birthDateSliced[1] + birthDateSliced[0];
    }

    private createPassword(): string {
        return Buffer.from('p'+Math.random(), 'utf8').toString('base64').substring(0, 6);
    }
}
