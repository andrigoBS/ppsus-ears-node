import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Baby} from "../baby/Baby";
import {AddressComponent as Address} from "../decorators/components/Address";

@Entity("responsavel")
export class Guardian extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_responsavel"})
    id: number;

    @Column({name: "data_nascimento", type: "date", update: false})
    birthDate: Date;

    @Column({name: "cpf", type: "varchar", length: 11})
    cpf: string;

    @Column(() => Address, {prefix: false})
    address: Address;

    @ManyToMany(() => Baby, baby => baby.guardians)
    ward: Baby[]

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

}