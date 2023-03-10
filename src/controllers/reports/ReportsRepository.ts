import { Institution } from '../../entity/institution/Institution';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import { Therapist } from '../../entity/therapist/Therapist';
import { Triage } from '../../entity/triage/Triage';

export default class ReportsRepository {
    public async passBabiesByInstitutions(institutionsIDs: number[]): Promise<number> {
        return Triage
            .createQueryBuilder('t')
            .where('t.institution IN (:institutionsIDs)', { institutionsIDs })
            .andWhere('t.leftEar = 1')
            .andWhere('t.rightEar = 1')
            .getCount()
        ;
    }

    public async failBabiesByInstitutions(institutionsIDs: number[]): Promise<number> {
        return Triage
            .createQueryBuilder('t')
            .where('t.institution IN (:institutionsIDs)', { institutionsIDs })
            .andWhere('(t.leftEar = 1 OR t.rightEar = 1)')
            .getCount()
        ;
    }

    public async getInstitutionsIDsOfTherapist(therapistId: number): Promise<number[]> {
        const result = await Therapist
            .createQueryBuilder('t')
            .select(['i.id AS id'])
            .leftJoin('t.institutions', 'i')
            .where('t.id = :therapistId', { therapistId })
            .getRawMany()
        ;
        return result.map(r => r.id);
    }

    public async getInstitutionsIDsOfInstitutionUser(userId: number): Promise<number> {
        const result = await InstitutionUser
            .createQueryBuilder('iu')
            .select(['i.id AS id'])
            .leftJoin('iu.institution', 'i')
            .where('iu.id = :userId', { userId })
            .getRawOne()
        ;
        return result.id;
    }

    public async getInstitutionsIDsOfSecretary(userId: number): Promise<number[]> {
        const secretary = await SecretaryUser.createQueryBuilder('su')
            .select(['su.state AS state', 'su.zone AS zone'])
            .leftJoin('su.state', 's')
            .leftJoin('su.zone', 'z')
            .where('su.id = :userId', { userId })
            .getRawOne()
        ;
        const cities = secretary.state? secretary.state.cities : secretary.zone.cities;
        const institutions = await Institution
            .createQueryBuilder('i')
            .select(['i.id'])
            .where('i.city IN (:cities)', { cities })
            .getMany()
        ;
        return institutions.map(i => i.id);
    }
}
