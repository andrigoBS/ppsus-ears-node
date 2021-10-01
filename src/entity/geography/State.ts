import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("estado")
export class State extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_estado"})
    id: number;

    @Column({name: "nome", type: "varchar", length: 20})
    name: string;

    @Column({name: "uf", type: "varchar", length: 2})
    uf: string;

}