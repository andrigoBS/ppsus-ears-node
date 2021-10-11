import {BaseEntity, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Zone} from "./Zone";

@Entity("municipio")
export class City extends BaseEntity{

    @PrimaryGeneratedColumn({name: "id_municipio"})
    id: number;

    @JoinColumn({name: "fk_regiao"})
    @Index("fk_municipio_regiao1_idx")
    @ManyToOne(() => Zone, zone => zone.cities)
    zone: Zone;

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do município"
    })
    registrationDate: Date;

}