import { Institution } from '../../entity/institution/Institution';

export default class InstitutionRepository {

    public async findIdsSimilar(institutionName: string, cnes: string, limit?: number): Promise<{ id: number }[]>{
        let query = Institution
            .createQueryBuilder('i')
            .where('i.institutionName = :institutionName', { institutionName })
            .orWhere('i.cnes = :cnes', { cnes })
            .select(['i.id AS id'])
        ;
        if(limit) {
            query = query.limit(limit);
        }
        return query.execute();
    }

    public async findOne(options: object): Promise<Institution | undefined>{
        return Institution.findOne(options);
    }

    public async findAll(options?: object, limit?: number): Promise<Institution[] | undefined>{
        let query = Institution
            .createQueryBuilder('i')
            .select(['i.id AS id', 'i.institutionName AS name'])
            .orderBy('name','DESC');
        if(limit) {
            query = query.limit(limit);
        }
        return query.execute();
    }

    public async save(institution: Institution): Promise<Institution>{
        return Institution.save(institution);
    }
}
