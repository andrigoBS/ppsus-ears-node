import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, Index,
    JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {State} from "./State";
import {City} from "./City";


@Entity("regiao")
export class Zone extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_regiao"})
    id: number;

    @Column({name: "nome", type: "varchar", length: "45"})
    name: string;

    @JoinColumn({name: "fk_estado"})
    @Index("fk_regiao_estado1_idx")
    @ManyToOne(() => State, state => state.zones, {
        nullable: false
    })
    state: State;

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

    @OneToMany(() => City, city => city.zone)
    cities: City[];

}