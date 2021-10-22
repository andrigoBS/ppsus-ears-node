import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn, ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {Guardian} from "../guardian/Guardian";
import {JoinTable} from "typeorm/browser";

@Entity("bebe")
export class Baby extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_bebe"})
    id: number;

    @Column({name: "peso", type: "float"})
    weight: number;

    @Column({name: "altura", type: "float"})
    height: number;

    @Column({name: "circumferencia", type: "float"})
    circumference: number;

    @Column({name: "data_nascimento", type: "datetime", update: false})
    birthDate: Date;

    @Column({name: "idade_gestacional", type: "int", update: false})
    gestationalAge: number;

    @Column({name: "tipo_parto", type: "enum", update: false})
    childBirthType: ChildBirth;

    @Column({name: "obito_materno", type: "boolean", update: false})
    maternalDeath: boolean

    @JoinColumn({name: "fk_mae_bio"})
    @OneToOne(() => Guardian, {
        nullable: false
    })
    birthMother: Guardian;

    @JoinTable ({name: "bebe_responsavel",
        joinColumn: {name: "fk_bebe"}, inverseJoinColumn: {name: "fk_responsavel"}
    })
    @ManyToMany(() => Guardian, guardian => guardian.ward)
    guardians: Guardian;

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

}

export enum ChildBirth {
    CESAREAN = "Parto Cirúrgico (Cesárea)",
    NATURAL = "Parto Vaginal Natural",
    VACUUM = "Parto Vaginal com Extrator a vácuo",
    FORCEPS = "Parto Vaginal com Fórceps",
    WATER = "Parto na água",
}