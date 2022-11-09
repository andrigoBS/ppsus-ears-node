import { HttpError, HttpStatus } from '../../AbstractHttpErrors';
import { Request, Response } from 'express';
import { Orientation } from '../../../entity/orientation/Orientation';
import OrientationService from './OrientationService';

export default class OrientationController {
    private orientationService: OrientationService;

    constructor() {
        this.orientationService = new OrientationService();
    }

    public async create(req: Request, res: Response) {
        try{
            let orientation = req.body as Orientation;
            orientation.therapist = req.body.jwtObject.id;
            orientation = await this.orientationService.create(orientation);

            return res.status(HttpStatus.OK).json(orientation);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getAll(req: Request, res: Response) {
        try{
            const orientation = await this.orientationService.getAll(req);
            return res.status(HttpStatus.OK).json(orientation);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

}
