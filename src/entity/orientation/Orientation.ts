import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Therapist} from "../therapist/Therapist";

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
}
