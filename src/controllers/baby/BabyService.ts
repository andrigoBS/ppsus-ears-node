import { Baby } from '../../entity/baby/Baby';
import { OnFindBabyError } from './BabyErrors';
import BabyRepository from './BabyRepository';
import { ChildBirth, ChildBirthIdName, ChildBirthString } from './BabyTypes';

export default class BabyService{
    private babyRepository: BabyRepository;

    constructor() {
        this.babyRepository = new BabyRepository();
    }

    public async create(baby: Baby, findChildBirthType: boolean): Promise<Baby> {
        if(findChildBirthType) {
            baby.childBirthType = ChildBirth[baby.childBirthType as unknown as ChildBirthString];
        }
        return this.babyRepository.save(baby);
    }

    public async listChildBirthTypes(): Promise<ChildBirthIdName[]> {
        return Object.keys(ChildBirth).map((key) => (
            { id: key, name: ChildBirth[key as ChildBirthString] }
        ));
    }

    public async getAllBabies(): Promise<Baby[]>  {
        try {
            return this.babyRepository.getAllBabies();
        }catch (e: any){
            throw new OnFindBabyError(e.message);
        }
    }
}
