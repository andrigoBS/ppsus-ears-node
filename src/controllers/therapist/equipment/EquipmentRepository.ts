import { Request } from 'express';
import { Equipment } from '../../../entity/equipment/Equipment';

export default class EquipmentRepository {
    public async create(equipment: Equipment) {
        return Equipment.save(equipment);
    }

    public async deleteOne(idEquipment: number) {
        return Equipment.createQueryBuilder('equipment')
            .update()
            .set({
                dateOfDeactivation: new Date()
            })
            .where('id = :id', { id: idEquipment })
            .execute();
    }

    public getAll(req: Request): Promise<Equipment[] | undefined>{
        const query = Equipment.createQueryBuilder('equipment')
            .select([
                'equipment.id AS id',
                'equipment.model AS name',
                'equipment.model AS model',
                'equipment.brand AS brand',
                'equipment.dateOfLastCalibration AS dateOfLastCalibration'
            ]).orderBy('name','ASC');

        if(req.query.model){
            query.andWhere('equipment.model like :model', { model: `%${req.query.model}%` });
        }

        if(req.query.brand){
            query.andWhere('equipment.brand like :brand', { brand: `%${req.query.brand}%` });
        }

        if(req.query.dateOfLastCalibration){
            query.andWhere('equipment.dateOfLastCalibration like :date', { date: `%${req.query.dateOfLastCalibration}%` });
        }

        if(req.query.listAllActives){
            query.andWhere('equipment.dateOfDeactivation IS NULL');
        }

        return query.getRawMany();
    }
}