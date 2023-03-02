import { Request } from 'express';
import { Orientation } from '../../../entity/orientation/Orientation';

export default class OrientationRepository {
    public async create(orientation: Orientation) {
        return Orientation.save(orientation);
    }

    public async deleteOne(idOrientation: number) {
        return Orientation.createQueryBuilder('orientation')
            .update()
            .set({
                dateOfDeactivation: new Date()
            })
            .where('id = :id', { id: idOrientation })
            .execute();
    }

    public getAll(req: Request): Promise<Orientation[] | undefined>{
        const query = Orientation.createQueryBuilder('orientation')
            .select(
                ['orientation.id AS id',
                    'orientation.description AS name',
                    'orientation.dateOfDeactivation AS dateOfDeactivation',
                    'orientation.therapist AS therapist'
                ])
            .where('(orientation.therapist = :id OR orientation.therapist is null)', { id: req.body.jwtObject.id })
            .orderBy('orientation.description', 'ASC');

        if(req.query.description){
            query.andWhere('orientation.description like :description', { description: `%${req.query.description}%` });
        }

        if(req.query.listAllActives){
            query.andWhere('orientation.dateOfDeactivation IS NULL');
        }


        return query.getRawMany();
    }
}