import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import { Therapist } from '../../entity/therapist/Therapist';
import { Triage } from '../../entity/triage/Triage';
import { NotFoundInstitutionError } from '../institution/InstitutionErrors';
import { NotFoundTherapistError } from '../therapist/TherapistErrors';

export default class ReportsRepository {
    public async passBabiesByInstitutions(institutionsIDs: number[]): Promise<number> {
        return Triage
            .createQueryBuilder('t')
            .select(['t.id'])
            // .leftJoin('c.state', 's')
            .where('t.institution IN (:institutionsIDs)', { institutionsIDs })
            .andWhere('t.leftEar = 1')
            .andWhere('t.rightEar = 1')
            .getCount()
        ;
    }

    public async failBabiesByInstitutions(institutionsIDs: number[]): Promise<number> {
        return Triage
            .createQueryBuilder('t')
            .select(['t.id'])
            // .leftJoin('c.state', 's')
            .where('t.institution IN (:institutionsIDs)', { institutionsIDs })
            .andWhere('(t.leftEar = 1 OR t.rightEar = 1)')
            .getCount()
        ;
    }

    public async getInstitutionsIDsOfTherapist(therapistId: number): Promise<number[]> {
        const therapist = await Therapist.findOne(therapistId);

        if(!therapist){
            throw new NotFoundTherapistError(therapistId.toString());
        }

        return therapist.institutions.map(i => i.id);
    }

    public async getInstitutionsIDsOfInstitutionUser(userId: number): Promise<number> {
        const institutionUser = await InstitutionUser.findOne(userId);
        if(!institutionUser){
            throw new NotFoundInstitutionError();
        }
        return institutionUser.institution.id;
    }

    // public async getInstitutionsIDsOfSecretary(userID: number): Promise<number[]> {
    //     const secretary = await SecretaryUser.findOne(userID);
    //     if(!secretary){
    //         throw new NotFoundSecretaryUserError();
    //     }
    //
    // }
}
