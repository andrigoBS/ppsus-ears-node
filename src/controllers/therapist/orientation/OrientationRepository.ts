import { Request } from 'express';
import { Orientation } from '../../../entity/orientation/Orientation';

export default class OrientationRepository {
    public async create(orientation: Orientation) {
        return Orientation.save(orientation);
    }

    public getAll(req: Request): Promise<Orientation[] | undefined>{
        const query = Orientation.createQueryBuilder('orientation')
            .select(['orientation.id AS id', 'orientation.description AS name'])
            .where('(orientation.therapist = :id OR orientation.therapist is null)', { id: req.body.jwtObject.id })
            .orderBy('orientation.description', 'ASC');

        if(req.query.description){
            query.andWhere('orientation.description like :description', { description: `%${req.query.description}%` });
        }
        return query.getRawMany();
    }
}