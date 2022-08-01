import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TriageType {
    EOET = 'EOET',
    PEATEA = 'PEATE-A',
    EOET_PEATEA = 'EOET + PEATE-A',
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

    /*
    * ................. joins .................
    * Equipamerntos
    * Observação
    * Conduta
    * Indicador
    * Orientação
    * Fono
    * Instituicao
    * Respensavel
    * Bebe
    */
}
