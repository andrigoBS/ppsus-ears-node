import { Equipment } from '../../../entity/equipment/Equipment';

export default class EquipmentRepository {
    public async create(equipment: Equipment) {
        return Equipment.save(equipment);
    }

    public getAll(): Promise<Equipment[] | undefined>{
        const query = Equipment.createQueryBuilder('equipment')
            .select([
                'equipment.id AS id',
                'equipment.model AS name',
                'equipment.model AS model',
                'equipment.brand AS brand',
                'equipment.dateOfLastCalibration AS dateOfLastCalibration'
            ]).orderBy('name','ASC');
        return query.getRawMany();
    }
}