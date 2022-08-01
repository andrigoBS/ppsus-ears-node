import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * O profissional de fonoaudiologia que ira atender o bebe
 */
@Entity('fonoaudiologo')
export class Therapist extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id_fonoaudiologo',
        comment: 'Chave primária do fonoaudiologo',
    })
        id: number;

    @Column({
        name: 'nome', type: 'varchar', length: 255,
        comment: 'Nome', nullable: false
    })
        name: string;

    @Column({
        name: 'crfa', type: 'varchar', length: 8,
        comment: 'crfa', nullable: false
    })
        crfa: string;

    @Column({
        name: 'tempo_experiencia', type: 'json',
        comment: 'Json do tempo de experiência', nullable: false
    })
        xp: string;

    //falta join em telefone, email, usuario
}
