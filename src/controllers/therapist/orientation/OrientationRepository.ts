import { Request } from 'express';
import { Orientation } from '../../../entity/orientation/Orientation';

export default class OrientationRepository {
    public async create(orientation: Orientation) {
        return Orientation.save(orientation);
    }

    public getAll(req: Request): Promise<Orientation[] | undefined>{
        const query = Orientation.createQueryBuilder('orientation')
            .select(['orientation.id AS id', 'orientation.description AS name', 'orientation.description AS description'])
            .where('orientation.therapist = :id', { id: req.body.jwtObject.id })
            .orWhere('orientation.therapist is null').orderBy('name', 'ASC');

        return query.getRawMany();
    }
}