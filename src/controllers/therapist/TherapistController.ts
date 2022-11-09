import { HttpError, HttpStatus } from '../AbstractHttpErrors';
import { Request, Response } from 'express';
import { Therapist } from '../../entity/therapist/Therapist';
import CryptoHelper from '../../helpers/CryptoHelper';
import TherapistService from './TherapistService';
import { TherapistXP, TherapistXPString } from './TherapistTypes';

export default class TherapistController {
    private therapistService: TherapistService;

    constructor() {
        this.therapistService = new TherapistService();
    }

    public async create(req: Request, res: Response) {
        let therapist: Therapist;

        try{
            const therapistJson = req.body;

            therapistJson.xp = TherapistXP[therapistJson.xp as TherapistXPString];
            therapistJson.institutions = therapistJson.institutions.map((i: number) => ({ id: i }));
            therapist = therapistJson as Therapist;

            await this.therapistService.isATherapistUser(therapist);

            therapist.password = CryptoHelper.encrypt(therapist.password);
            await this.therapistService.create(therapist, therapistJson.emails, therapistJson.phones);

            return res.status(HttpStatus.OK).json(therapist);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }


    public async getEditableFields(req: Request, res: Response) {
        try{
            const therapistId = req.params.id;
            const therapist = await this.therapistService.isAExistentTherapist(Number(therapistId));

            const retornoTherapist: any = { ...therapist };
            retornoTherapist.xp = { id: 'LESS_ONE', name: 'Menos de 1 ano' };

            return res.status(HttpStatus.OK).json(retornoTherapist);
        }catch (e: HttpError | any) {
            if (e instanceof HttpError) {
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getDashboard(res: Response) {
        try{
            const dashboard = await this.therapistService.getDashboard();
            return res.status(HttpStatus.OK).json(dashboard);
        }catch (e: HttpError | any) {
            if (e instanceof HttpError) {
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getXpTypes(res: Response) {
        try{
            const therapistXp = await this.therapistService.getXpTypes();
            return res.status(HttpStatus.OK).json(therapistXp);
        }catch (e: HttpError | any) {
            if (e instanceof HttpError) {
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}
