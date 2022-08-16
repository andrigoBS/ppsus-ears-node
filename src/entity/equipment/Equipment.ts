import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Triage } from '../triage/Triage';

@Entity('equipamento')
export class Equipment extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_equipamento' })
    id: number;

    @Column({ name: 'modelo', type: 'varchar', length: 255,
        comment: 'Modelo do equipamento',
    })
    model: string;

    @Column({ name: 'marca', type: 'varchar', length: 255,
        comment: 'Marca do equipamento',
    })
    brand: string;

    @Column({ name: 'data_calibracao', type: 'date',
        comment: 'Data do último calibramento do equipamento',
    })
    dateOfLastCalibration: Date;

    @OneToMany(() => Triage, (triage) => triage.therapist)
    triages: Triage;
}
