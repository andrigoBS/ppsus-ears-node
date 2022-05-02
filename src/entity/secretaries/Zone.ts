import {
    BaseEntity, BeforeInsert, BeforeUpdate,
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
import {ValidateNested, validateOrReject} from "class-validator";

@Entity("regiao")
export class Zone extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_regiao"})
    id: number;

    @JoinColumn({name: "fk_estado"})
    @ManyToOne(() => State, state => state.zones, {
        nullable: false
    })
    state: State;

    @ValidateNested()
    @Column(() => Secretary, {prefix: "secretaria"})
    secretary: Secretary;

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

    @OneToMany(() => City, city => city.zone)
    cities: City[];

    @BeforeInsert()
    @BeforeUpdate()
    private validate(): Promise<void> {
        return validateOrReject(this)
    }

}