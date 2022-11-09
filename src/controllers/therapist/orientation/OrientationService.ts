import { Request } from 'express';
import { Orientation } from '../../../entity/orientation/Orientation';
import OrientationRepository from './OrientationRepository';

export default class OrientationService{
    private orientationRepository: OrientationRepository;

    constructor() {
        this.orientationRepository = new OrientationRepository();
    }

    public async create(orientation: Orientation) {
        return this.orientationRepository.create(orientation);
    }

    public async getAll(req: Request): Promise<Orientation[] | undefined>{
        return this.orientationRepository.getAll(req);
    }
}