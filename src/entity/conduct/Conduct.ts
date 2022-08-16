import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TriageType} from "../triage/Triage";
import {Therapist} from "../therapist/Therapist";

@Entity('conduta')
export class Conduct extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_conduct' })
    id: number;

    @Column({ name: 'descricao_resultado', type: 'text',
        comment: 'Descrição da conduta',
    })
    resultDescription: string;

    @Column({ name: 'descricao_acompanhamento', type: 'text',
        comment: 'Descrição do acompanhamento',
    })
    accompanyDescription: string;

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

    @Column({
        name: 'irda', type: 'tinyint',
        comment: 'Se o a conduta está relacionada com o irda', nullable: false
    })
    irda: boolean;


    @Column({ name: 'tipo_triagem', type: 'enum', update: false, enum: TriageType,
        comment: 'Tipo de triagem',
    })
    type: TriageType;


    @Column({
        name: 'tipo_teste', type: 'int',
        comment: 'Se é relacionado ao teste, reteste e teste e reteste', nullable: false
    })
    testType: number;

    @JoinColumn({ name: 'fk_fonoaudiologo' })
    @ManyToOne(() => Therapist, { nullable: true })
    therapist: Therapist;
}
