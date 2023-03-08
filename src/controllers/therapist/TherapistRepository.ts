import { Therapist } from '../../entity/therapist/Therapist';
import { TherapistEmail } from '../../entity/therapist/TherapistEmail';
import { TherapistPhone } from '../../entity/therapist/TherapistPhone';

export default class TherapistRepository {

    public findLogin({ login }: Therapist): Promise<{ id: number } | undefined>{
        const query = Therapist.createQueryBuilder('therapist')
            .select(['therapist.id AS id'])
            .where('therapist.login = :login', { login: login });
        return query.getRawOne();
    }

    public getEditableFields(therapistId: number): Promise<Therapist | undefined>{
        const query = Therapist.createQueryBuilder('therapist')
            .select([
                'therapist.crfa AS crfa',
                'therapist.xp AS xp',
                'therapist.id AS id',
                'therapist.login AS login',
                'therapist.name AS name'
            ])
            .where('therapist.id = :id', { id: therapistId });
        return query.getRawOne();
    }

    public save(therapist: Therapist): Promise<Therapist>{
        return Therapist.save(therapist);
    }

    public saveEmails(therapist: Therapist,  emails: string[]): Promise<TherapistEmail[]>{
        return TherapistEmail.save(
            emails.map((email) => {
                const entity = new TherapistEmail();
                entity.email = email;
                entity.therapist = therapist;
                return entity;
            })
        );
    }

    public savePhones(therapist: Therapist,  phones: string[]): Promise<TherapistPhone[]>{
        return TherapistPhone.save(
            phones.map((number) => {
                const entity = new TherapistPhone();
                entity.phoneNumber = number;
                entity.therapist = therapist;
                return entity;
            })
        );
    }
}
