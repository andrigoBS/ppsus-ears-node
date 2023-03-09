import { Orientation } from '../../../entity/orientation/Orientation';
import { NotFoundOrientationError } from './OrientationErrors';
import OrientationRepository from './OrientationRepository';
import { QueryOrientationDTO } from './OrientationTypes';

export default class OrientationService{
    private orientationRepository: OrientationRepository;

    constructor() {
        this.orientationRepository = new OrientationRepository();
    }

    public async create(orientation: Orientation): Promise<Orientation> {
        return this.orientationRepository.create(orientation);
    }

    public async deleteOne(idOrientation: number): Promise<Orientation> {
        const orientation = await this.orientationRepository.getOne(idOrientation);
        if(!orientation) {
            throw new NotFoundOrientationError(idOrientation.toString());
        }
        return this.orientationRepository.deleteOne(orientation);
    }

    public async getAll(query: QueryOrientationDTO, therapistID: number,): Promise<Orientation[] | undefined>{
        return this.orientationRepository.getAll(therapistID, query.description, query.listAllActives);
    }
}
