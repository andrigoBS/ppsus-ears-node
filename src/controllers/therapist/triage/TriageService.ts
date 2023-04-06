import { Triage, TriageString, TriageType } from '../../../entity/triage/Triage';
import TriageRepository from './TriageRepository';
import { QueryTriageDTO } from './TriageTypes';

export default class TriageService {
    private triageRepository: TriageRepository;

    constructor() {
        this.triageRepository = new TriageRepository();
    }

    public async create(triage: Triage) {
        return this.triageRepository.create(triage);
    }

    public async triageTypes() {
        return Object.keys(TriageType).map((key) => (
            { id: key, name: TriageType[key as TriageString] }
        ));
    }

    public async getAll(params: QueryTriageDTO) {
        return this.triageRepository.getAll(params);
    }
}
