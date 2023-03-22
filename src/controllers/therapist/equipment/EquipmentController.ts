import AbstractController from '../../AbstractController';
import { Request, Response } from 'express';
import { Equipment } from '../../../entity/equipment/Equipment';
import { ValidatorBoolean } from '../../../helpers/validator/ValidatorBoolean';
import { ValidatorDate } from '../../../helpers/validator/ValidatorDate';
import { ValidatorObject } from '../../../helpers/validator/ValidatorObject';
import { ValidatorString } from '../../../helpers/validator/ValidatorString';
import EquipmentService from './EquipmentService';
import { QueryEquipmentDTO } from './EquipmentTypes';

export default class EquipmentController extends AbstractController{
    private equipmentService: EquipmentService;

    constructor() {
        super();
        this.equipmentService = new EquipmentService();
    }

    public async create(req: Request, res: Response) {
        const validateParams = {
            body: new ValidatorObject('body', true).fromObject({
                brand: new ValidatorString('marca', true),
                dateOfLastCalibration: new ValidatorDate('data da ultima calibração', true),
                model: new ValidatorString('modelo', true),
            }),
        };

        return super.genericProcess<Equipment>(req, res, validateParams, async (equipment) => {
            return this.equipmentService.create(equipment);
        });
    }

    public async getAll(req: Request, res: Response) {
        const validateParams = {
            query: new ValidatorObject('query', false).fromObject({
                brand: new ValidatorString('marca', false),
                dateOfLastCalibration: new ValidatorDate('data da ultima calibração', false),
                listAllActives: new ValidatorBoolean('listar todos os ativos', false),
                model: new ValidatorString('modelo', false),
            }),
        };

        return super.genericProcess<QueryEquipmentDTO>(req, res, validateParams, async (params) => {
            return this.equipmentService.getAll(params);
        });
    }

    public async deleteOne(req: Request, res: Response) {
        const validateParams = {
            params: new ValidatorObject('params', true).fromObject({
                id: new ValidatorString('ID', true),
            }),
        };

        return super.genericProcess<{id: number}>(req, res, validateParams, async (params) => {
            return this.equipmentService.deleteOne(params.id);
        });
    }
}
