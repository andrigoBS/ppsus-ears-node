import { HttpError, HttpStatus } from '../../AbstractHttpErrors';
import { Request, Response } from 'express';
import { Equipment } from '../../../entity/equipment/Equipment';
import EquipmentService from './EquipmentService';

export default class EquipmentController {
    private equipmentService: EquipmentService;

    constructor() {
        this.equipmentService = new EquipmentService();
    }

    public async create(req: Request, res: Response) {
        try{
            let equipment = req.body as Equipment;
            equipment = await this.equipmentService.create(equipment);

            return res.status(HttpStatus.OK).json(equipment);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const equipment = await this.equipmentService.getAll(req);

            return res.status(HttpStatus.OK).json(equipment);
        }catch (e: HttpError | any){
            if(e instanceof HttpError){
                return res.status(e.httpStatus).json(e.messages);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}
