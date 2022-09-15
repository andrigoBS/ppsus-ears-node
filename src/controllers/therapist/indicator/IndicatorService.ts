import { Request } from 'express';
import { Indicator } from '../../../entity/indicator/Indicator';
import IndicatorRepository from './IndicatorRepository';

export default class IndicatorService{
    private indicatorRepository: IndicatorRepository;

    constructor() {
        this.indicatorRepository = new IndicatorRepository();
    }

    public async create(indicator: Indicator) {
        return this.indicatorRepository.create(indicator);
    }

    public async getAll(req: Request): Promise<Indicator[] | undefined>{
        return this.indicatorRepository.getAll(req);
    }
}