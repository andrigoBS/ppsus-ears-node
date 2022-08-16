import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Therapist } from '../therapist/Therapist';
import { Triage } from '../triage/Triage';

@Entity('orientacao')
export class Orientation extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_orientation' })
    id: number;

    @Column({ name: 'descricao', type: 'varchar', length: 255,
        comment: 'Descreve a orientação',
    })
    description: string;

    @JoinColumn({ name: 'fk_fonoaudiologo' })
    @ManyToOne(() => Therapist, { nullable: true })
    therapist: Therapist;

    @OneToMany(() => Triage, (triage) => triage.therapist)
    triages: Triage;
}
