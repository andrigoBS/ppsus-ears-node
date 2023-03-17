import { HttpError, HttpStatus } from '../AbstractHttpErrors';
import { Request, Response } from 'express';
import ReportsService from './ReportsService';

export default class ReportsController {
    private readonly reportsService: ReportsService;

    constructor() {
        this.reportsService = new ReportsService();
    }

    public async getBabiesPassFailSecretary(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getBabiesPassFailSecretary(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getBabiesPassFailInstitution(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getBabiesPassFailInstitution(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getBabiesPassFailTherapist(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getBabiesPassFailTherapist(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    // public async getBabiesComeBorn(req: Request, res: Response) {
    //     try{
    //         const result = await this.reportsService.getBabiesComeBorn(req.params.userType, req.body.jwtObject.id);
    //         return res.status(HttpStatus.OK).json(result);
    //     }catch (e: HttpError | any){
    //         if(e instanceof HttpError){
    //             return res.status(e.httpStatus).json(e.messages);
    //         }
    //         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    //     }
    // }

    public async getIndicatorsPercentSecretary(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicatorsPercentSecretary(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getIndicatorsPercentInstitution(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicatorsPercentInstitution(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getIndicatorsPercentTherapist(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicatorsPercentTherapist(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getIndicatorsSecretary(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicatorsSecretary(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getIndicatorsInstitution(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicatorsInstitution(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getIndicatorsTherapist(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getIndicatorsTherapist(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getEquipmentSecretary(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getEquipmentSecretary(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getEquipmentInstitution(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getEquipmentInstitution(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
    public async getEquipmentTherapist(req: Request, res: Response) {
        try{
            const result = await this.reportsService.getEquipmentTherapist(req.body.jwtObject.id);
            return res.status(HttpStatus.OK).json(result);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}
