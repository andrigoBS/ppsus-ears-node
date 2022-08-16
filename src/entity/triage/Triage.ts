import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Baby } from '../baby/Baby';
import { Conduct } from '../conduct/Conduct';
import { Equipment } from '../equipment/Equipment';
import { Indicator } from '../indicator/Indicator';
import { Institution } from '../institution/Institution';
import { Orientation } from '../orientation/Orientation';
import { Therapist } from '../therapist/Therapist';

export type TriageString = 'EOET' | 'EOEP' | 'PEATEA' | 'EOET_PEATEA';
export enum TriageType {
    EOET = 'EOE transitente',
    EOEP = 'EOE produto de distorção',
    PEATEA = 'PEATE automático',
    EOET_PEATEA = 'EOE transitente + PEATE automático',
}

@Entity('triagem')
export class Triage extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_triagem' })
    id: number;

    @Column({
        name: 'orelha_esquerda', type: 'tinyint',
        comment: 'Se a orelha esquerda passou no teste', nullable: false
    })
    leftEar: boolean;

    @Column({
        name: 'orelha_direita', type: 'tinyint',
        comment: 'Se a orelha direita passou no teste', nullable: false
    })
    rightEar: boolean;

    @Column({ name: 'data_avaliacao', type: 'datetime', update: false,
        comment: 'Data em que foi feito a avaliação)',
    })
    evaluationDate: Date;

    @Column({ name: 'tipo_triagem', type: 'enum', update: false, enum: TriageType,
        comment: 'Tipo de triagem',
    })
    type: TriageType;

    @Column({ name: 'observacao', type: 'text',
        comment: 'Qualquer tipo de observação sobre a triagem',
    })
    observation: string;

    // Relacionamentos

    @JoinColumn({ name: 'fk_fonoaudiologo' })
    @ManyToOne(() => Therapist, { nullable: false })
    therapist: Therapist;

    @JoinColumn({ name: 'fk_equipamento' })
    @ManyToOne(() => Equipment, { nullable: false })
    equipment: Equipment;

    @JoinColumn({ name: 'fk_conduta' })
    @ManyToOne(() => Conduct, { nullable: false })
    conduct: Conduct;

    @JoinColumn({ name: 'fk_orientacao' })
    @ManyToOne(() => Orientation, { nullable: false })
    orientation: Orientation;

    @JoinColumn({ name: 'fk_instituicao' })
    @ManyToOne(() => Institution, { nullable: false })
    institution: Institution;

    @JoinColumn({ name: 'fk_bebe' })
    @ManyToOne(() => Baby, { nullable: false })
    baby: Baby;

    @JoinTable ({ name: 'triagem_indicador',
        joinColumn: { name: 'fk_triagem' }, inverseJoinColumn: { name: 'fk_indicador' },
    })
    @ManyToMany(() => Indicator, (indicator) => indicator.triages)
    indicators: Indicator[];
}
