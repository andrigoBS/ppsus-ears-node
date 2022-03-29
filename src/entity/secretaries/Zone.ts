import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {State} from "./State";
import {City} from "./City";
import {SecretaryComponent as Secretary} from "../decorators/components/Secretary";
import {IsEmail} from "class-validator";


@Entity("regiao")
export class Zone extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_regiao"})
    id: number;

    @Column({name: "nome", type: "varchar", length: "45"})
    name: string;

    @IsEmail()
    @Column({name: "email", type: "varchar", length: 255, unique: true,
        comment: "Endereço de email para contato"
    })
    email: string[];

    @JoinColumn({name: "fk_estado"})
    @ManyToOne(() => State, state => state.zones, {
        nullable: false
    })
    state: State;

    @Column(() => Secretary, {prefix: "secretaria"})
    secretary: Secretary;

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

    @OneToMany(() => City, city => city.zone)
    cities: City[];

}