import { Therapist } from '../../entity/therapist/Therapist';
import { DuplicateEmail, DuplicatePhone } from '../GenericsErrors';
import { NotFoundTherapistError, OnFindTherapistError } from './TherapistErrors';
import TherapistRepository from './TherapistRepository';
import { TherapistIdName, TherapistXP, TherapistXPString } from './TherapistTypes';

export default class TherapistService {
    private therapistRepository: TherapistRepository;

    constructor() {
        this.therapistRepository = new TherapistRepository();
    }

    public async create(therapist: Therapist, emails: any[], phones: any[]): Promise<Therapist> {
        therapist = await this.therapistRepository.save(therapist);
        try {
            await this.therapistRepository.saveEmails(therapist, emails);
        }catch (e: any) {
            throw new DuplicateEmail(e.message); //TODO: não ta funcionando, ta sempre caindo aqui
        }
        try {
            await this.therapistRepository.savePhones(therapist, phones);
        }catch (e: any) {
            throw new DuplicatePhone(e.message);
        }
        return therapist;
    }


    public async isATherapistUser(therapist: Therapist): Promise<void> {
        const therapist2 = await this.therapistRepository.findLogin(therapist);

        if(therapist2){
            throw new OnFindTherapistError(therapist2.id.toString());
        }
    }

    public async isAExistentTherapist(therapistId: number): Promise<Therapist> {
        const therapist = await this.therapistRepository.getEditableFields(therapistId);

        if(!therapist){
            throw new NotFoundTherapistError(therapistId.toString());
        }
        return therapist;
    }

    public async getDashboard(): Promise<{type: string}[]> {
        return [
            { type: 'baby-pass-fail' },
            // { type: 'baby-come-born' },
            { type: 'indicators-percent' },
            { type: 'indicators' },
            { type: 'equipment' }
        ];
    }

    public async getXpTypes(): Promise<TherapistIdName[]> {
        return Object.keys(TherapistXP).map((key) => (
            { id: key, name: TherapistXP[key as TherapistXPString] }
        ));
    }

}
