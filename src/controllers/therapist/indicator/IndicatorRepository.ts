import { Request } from 'express';
import { Indicator } from '../../../entity/indicator/Indicator';

export default class IndicatorRepository {
    public async create(indicator: Indicator) {
        return Indicator.save(indicator);
    }

    public getAll(req: Request): Promise<Indicator[] | undefined>{
        const query = Indicator.createQueryBuilder('indicator')
            .select(['indicator.id  AS id', 'indicator.name AS name'])
            .where('indicator.therapist = :id', { id: req.body.jwtObject.id })
            .orWhere('indicator.therapist is null').orderBy('indicator.name','ASC');

        if(req.query.name){
            query.andWhere('indicator.name like :name', { name: `%${req.query.name}%` });
        }
        return query.getRawMany();
    }
}