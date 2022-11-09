import { Baby } from '../../entity/baby/Baby';

export default class BabyRepository {
    public async getAllBabies(): Promise<Baby[]> {
        return Baby.createQueryBuilder('baby')
            .select(['baby.id AS id', 'baby.name AS name', 'baby.weight AS weight',
                'baby.height AS height', 'baby.circumference AS circumference',
                'baby.birthDate AS birthDate', 'baby.gestationalAge AS gestationalAge',
                'baby.childBirthType AS childBirthType', 'baby.birthMother AS birthMother'])
            // .where('baby.therapist = :id', { id: req.body.jwtObject.id })
            // .orWhere('baby.therapist is null')
            .getRawMany()
        ;
    }
}
