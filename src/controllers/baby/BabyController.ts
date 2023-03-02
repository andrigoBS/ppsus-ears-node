import { HttpError, HttpStatus } from '../AbstractHttpErrors';
import { Request, Response } from 'express';
import BabyService from './BabyService';

export default class BabyController {
    private babyService: BabyService;

    constructor() {
        this.babyService = new BabyService();
    }

    public async listChildBirthTypes(req: Request, res: Response) {
        try{
            const childBirth = await this.babyService.listChildBirthTypes();
            return res.status(HttpStatus.OK).json(childBirth);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getAllBabies(req: Request, res: Response) {
        try{
            const babies = await this.babyService.getAllBabies();
            return res.status(HttpStatus.OK).json(babies);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}
