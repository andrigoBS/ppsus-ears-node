import { HttpError, HttpStatus } from '../../AbstractHttpErrors';
import { Request, Response } from 'express';
import { Indicator } from '../../../entity/indicator/Indicator';
import IndicatorService from './IndicatorService';

export default class IndicatorController {
    private indicatorService: IndicatorService;

    constructor() {
        this.indicatorService = new IndicatorService();
    }

    public async create(req: Request, res: Response) {
        try{
            let indicator = req.body as Indicator;
            indicator.therapist = req.body.jwtObject.id;
            indicator = await this.indicatorService.create(indicator);

            return res.status(HttpStatus.OK).json(indicator);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const indicator = await this.indicatorService.getAll(req);
            return res.status(HttpStatus.OK).json(indicator);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

}
