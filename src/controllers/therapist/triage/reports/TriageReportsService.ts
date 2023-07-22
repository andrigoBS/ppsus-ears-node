import TriageRepository from '../TriageRepository';

export default class TriageReportsService {
    private triageRepository: TriageRepository;

    constructor() {
        this.triageRepository = new TriageRepository();
    }
}
