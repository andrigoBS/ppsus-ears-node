import { Institution } from '../../entity/institution/Institution';
import { InstitutionUser } from '../../entity/institution/InstitutionUser';
import CryptoHelper from '../../helpers/CryptoHelper';

export default class InstitutionRepository {

    public findIdsSimilar({ institutionName, cnes, cnpj }: Institution, limit?: number): Promise<{ id: number }[]>{
        let query = Institution
            .createQueryBuilder('i')
            .where('i.institutionName = :institutionName', { institutionName })
            .orWhere('i.cnes = :cnes', { cnes })
            .orWhere('i.cnpj = :cnpj', { cnpj })
            .select(['i.id AS id'])
        ;
        if(limit) {
            query = query.limit(limit);
        }
        return query.execute();
    }

    public findOne(options: object): Promise<Institution | undefined>{
        return Institution.findOne(options);
    }

    public findAll(options?: object, limit?: number): Promise<Institution[] | undefined>{
        let query = Institution
            .createQueryBuilder('i')
            .select(['i.id AS id', 'i.institutionName AS name'])
        ;
        if(limit) {
            query = query.limit(limit);
        }
        return query.execute();
    }

    public save(institution: Institution): Promise<Institution>{
        return Institution.save(institution);
    }

    public saveUser(institutionUser: InstitutionUser): Promise<InstitutionUser>{
        institutionUser.password = CryptoHelper.encrypt(institutionUser.password);
        return InstitutionUser.save(institutionUser);
    }
}
