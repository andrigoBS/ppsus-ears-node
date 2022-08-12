import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('indicador_risco')
export class Indicator extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_indicador_risco' })
    id: number;

    @Column({ name: 'nome', type: 'varchar', length: 255,
        comment: 'Nome do indicador de risco',
    })
    name: string;
}