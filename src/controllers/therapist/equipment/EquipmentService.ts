import { Equipment } from '../../../entity/equipment/Equipment';
import EquipmentRepository from './EquipmentRepository';

export default class EquipmentService{
    private equipmentRepository: EquipmentRepository;

    constructor() {
        this.equipmentRepository = new EquipmentRepository();
    }

    public async create(equipment: Equipment) {
        return this.equipmentRepository.create(equipment);
    }

    public async getAll(): Promise<Equipment[] | undefined>{
        return this.equipmentRepository.getAll();
    }
}