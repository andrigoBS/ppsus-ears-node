import { HttpError, HttpStatus } from '../AbstractHttpErrors';
import { Request, Response } from 'express';
import { ReferralService } from '../../entity/referral_service/ReferralService';
import ReferralServiceService from './ReferralServiceService';

export default class ReferralServiceController {
    private readonly referralServiceService: ReferralServiceService;

    constructor() {
        this.referralServiceService = new ReferralServiceService();
    }

    public async create(req: Request, res: Response) {
        try {
            let referralService = req.body as ReferralService;
            referralService = await this.referralServiceService.create(referralService);
            return res.status(HttpStatus.OK).json(referralService);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async listType(req: Request, res: Response) {
        try{
            const referralServiceType = await this.referralServiceService.listType();
            return res.status(HttpStatus.OK).send(referralServiceType);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}
