import { Institution } from '../../entity/institution/Institution';

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

    public save(institution: Institution): Promise<Institution>{
        return Institution.save(institution);
    }
}
