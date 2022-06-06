import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Zone} from './Zone';

/**
 * Município o qual a clínica se encontra.
 */
@Entity('municipio')
export class City extends BaseEntity {

    @PrimaryGeneratedColumn({name: 'id_municipio'})
    id: number;

    @Column({name: 'nome', type: 'varchar', length: 20, update: false})
    name: string;

    @JoinColumn({name: 'fk_regiao'})
    @ManyToOne(() => Zone, (zone) => zone.cities, {nullable: true})
    zone: Zone;

    @CreateDateColumn({name: 'data_cadastro', type: 'datetime',
        comment: 'Data de cadastro do município',
    })
    registrationDate: Date;

}
