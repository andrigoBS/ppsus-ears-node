import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Therapist} from "../therapist/Therapist";
import { Triage } from '../triage/Triage';

@Entity('indicador_risco')
export class Indicator extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_indicador_risco' })
    id: number;

    @Column({ name: 'nome', type: 'varchar', length: 255,
        comment: 'Nome do indicador de risco',
    })
    name: string;

    @JoinColumn({ name: 'fk_fonoaudiologo' })
    @ManyToOne(() => Therapist, { nullable: true })
    therapist: Therapist;

    @ManyToMany(() => Triage, (triage) => triage.indicators)
    triages: Triage[];
}
