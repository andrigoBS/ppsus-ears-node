import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Therapist} from "../therapist/Therapist";
import {TriageType} from "../triage/Triage";

@Entity('conduta')
export class Orientation extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_conduct' })
    id: number;

    @Column({ name: 'titulo', type: 'varchar', length: 255,
        comment: 'Titulo da conduta',
    })
    title: string;

    @Column({ name: 'tipo_resultado', type: 'varchar', length: 255,
        comment: 'Tipo de resultado (Satisfatório e Insatisfatório)',
    })
    resultType: string;

    @Column({ name: 'tipo_acompanhamento', type: 'varchar', length: 255,
        comment: 'Tipo de acompanhamento indicado. (Após a triagem)',
    })
    accompanyType: string;

    @Column({ name: 'descricao', type: 'varchar', length: 255,
        comment: 'Descrição da conduta',
    })
    description: string;

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
        name: 'teste', type: 'tinyint',
        comment: 'Se o a conduta está relacionada ao teste', nullable: false
    })
    test: boolean;

    @Column({
        name: 'reteste', type: 'tinyint',
        comment: 'Se o a conduta está relacionada ao reteste', nullable: false
    })
    retest: boolean;

    @Column({
        name: 'irda', type: 'tinyint',
        comment: 'Se o a conduta está relacionada com o irda', nullable: false
    })
    irda: boolean;

    @Column({ name: 'tipo_triagem', type: 'enum', update: false, enum: TriageType,
        comment: 'Tipo de triagem',
    })
    type: TriageType;

    @JoinColumn({ name: 'fk_fonoaudiologo' })
    @ManyToOne(() => Therapist, { nullable: true })
    therapist: Therapist;
}
