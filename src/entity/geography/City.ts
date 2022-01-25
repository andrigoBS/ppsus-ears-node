import {BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Zone} from "./Zone";

/**
 * Município o qual a clínica se encontra.
 */
@Entity("municipio")
export class City extends BaseEntity{

    @PrimaryGeneratedColumn({name: "id_municipio"})
    id: number;

    @JoinColumn({name: "fk_regiao"})
    @ManyToOne(() => Zone, zone => zone.cities)
    zone: Zone;

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do município"
    })
    registrationDate: Date;

}