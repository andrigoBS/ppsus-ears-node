import { getRepository } from 'typeorm';
import { UserTemplate } from '../../entity/decorators/templates/UserTemplate';
import { Guardian } from '../../entity/guardian/Guardian';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import { SecretaryUser } from '../../entity/secretaries/user/SecretaryUser';
import { Therapist } from '../../entity/therapist/Therapist';
import CryptoHelper from '../../helpers/CryptoHelper';
import { AuthUser } from '../../helpers/LoginHelper';

export type UserString = 'secretary' | 'institution' | 'therapist' | 'parents';

export type User = SecretaryUser | InstitutionUser | Therapist | Guardian | undefined;

export enum MappingUser {
    secretary = 'SecretaryUser',
    institution = 'InstitutionUser',
    therapist = 'Therapist',
    parents = 'Guardian',
}

export class UserRepository{
    public async save(userType: string, user: UserTemplate): Promise<User>{
        user.password = CryptoHelper.encrypt(user.password);

        return getRepository<User>(MappingUser[userType as UserString]).save(user);
    }

    public async findOne(userType: string, authObj: AuthUser): Promise<User[]> {
        let query = getRepository<User>(MappingUser[userType as UserString])
            .createQueryBuilder('u')
            .select('u.id','id')
            .addSelect('u.name','name')
            .where('u.login = :login', { login: authObj.login })
            .andWhere('u.password = :password', { password: CryptoHelper.encrypt(authObj.password) })
        ;

        if(userType === 'secretary'){
            query = query.addSelect('IF(u.state IS NULL, "ZONE", "STATE")', 'type');
        }

        return query
            .limit(1)
            .execute()
        ;
    }
}
