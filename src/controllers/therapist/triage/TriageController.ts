import { HttpStatus } from '../../../helpers/http/AbstractHttpErrors';
import { ResponseHttpController } from '../../../helpers/http/AbstractRoutesTypes';
import { Indicator } from '../../../entity/indicator/Indicator';
import { Therapist } from '../../../entity/therapist/Therapist';
import { Triage, TriageString, TriageType } from '../../../entity/triage/Triage';
import BabyService from '../../baby/BabyService';
import GuardianService from '../../guardian/GuardianService';
import TriageService from './TriageService';
import { QueryTriageDTO, TriageJwt } from './TriageTypes';

export default class TriageController {
    public async create(triageJson: TriageJwt) {
        const guardianService = new GuardianService();
        const babyService = new BabyService();
        const triageService = new TriageService();

        triageJson.type = TriageType[triageJson.type as unknown as TriageString];

        triageJson.therapist = { id: triageJson.jwtObject.id } as Therapist;

        triageJson.baby.birthMother = await guardianService.create(triageJson.baby.birthMother, true);
        if(triageJson.baby.guardians){
            triageJson.baby.guardians = await guardianService.bulkCreate(triageJson.baby.guardians, true);
        }

        triageJson.baby = await babyService.create(triageJson.baby, true);

        if(triageJson.indicators){
            triageJson.indicators = triageJson.indicators.map((id) => ({ id: (id as unknown as number) } as Indicator));
        }

        const result = await triageService.create(triageJson as Triage);
        return { httpStatus: HttpStatus.OK, result };
    }

    public async getAll(params: QueryTriageDTO) {
        const triageService = new TriageService();

        const result = await triageService.getAll(params);

        return { httpStatus: HttpStatus.OK, result };
    }

    public async triageTypes(): Promise<ResponseHttpController> {
        const triageService = new TriageService();

        const result = await triageService.triageTypes();

        return { httpStatus: HttpStatus.OK, result };
    }
}
