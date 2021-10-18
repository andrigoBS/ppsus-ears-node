import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Zone} from "./Zone";

@Entity("estado")
export class State extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_estado"})
    id: number;

    @Column({name: "codigo_ibge", type: "int", update: false, unique: true})
    code: number;

    @Column({name: "nome", type: "varchar", length: 20, update: false})
    name: string;

    @Column({name: "uf", type: "varchar", length: 2, update: false})
    uf: string;

    @OneToMany(() => Zone, zone => zone.state, {
        cascade: ["soft-remove", "recover", "remove"]
    })
    zones: Zone[];

}