import { HttpError, HttpStatus } from '../../AbstractHttpErrors';
import { Request, Response } from 'express';
import { Conduct } from '../../../entity/conduct/Conduct';
import ConductService from './ConductService';

export default class ConductController {
    private conductService: ConductService;

    constructor() {
        this.conductService = new ConductService();
    }

    public async create(req: Request, res: Response) {
        try{
            const therapistId = req.body.jwtObject.id;

            let conduct = req.body as Conduct;
            conduct.therapist = therapistId;
            conduct = await this.conductService.create(conduct);

            return res.status(HttpStatus.OK).json(conduct);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getAll(req: Request, res: Response) {
        try{
            const conduct = await this.conductService.getAll(req);

            return res.status(HttpStatus.OK).json(conduct);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async get(req: Request, res: Response) {
        try{
            const conduct = await this.conductService.get(req.body.leftEar, req.body.rightEar, req.body.irda, req.body.testType);

            return res.status(HttpStatus.OK).json(conduct);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

}
