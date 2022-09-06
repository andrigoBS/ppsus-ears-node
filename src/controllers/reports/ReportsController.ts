import { HttpError, HttpStatus } from '../AbstractHttpErrors';
import { Request, Response } from 'express';
import ReportsService from './ReportsService';

export default class ReportsController {
    private readonly reportsService: ReportsService;

    constructor() {
        this.reportsService = new ReportsService();
    }

    public async getBabiesPassFail(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getBabiesPassFail();
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getBabiesComeBorn(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getBabiesComeBorn();
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getIndicatorsPercent(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicatorsPercent();
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getIndicators(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicators();
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getEquipment(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getEquipment();
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}
