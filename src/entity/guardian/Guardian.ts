import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Baby} from "../baby/Baby";
import {AddressComponent as Address} from "../decorators/components/Address";
import {GuardianEmail as Email} from "./GuardianEmail";
import {GuardianPhone as Phone} from "./GuardianPhone";

@Entity("responsavel")
export class Guardian extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_responsavel",
        comment: "Chave primária do responsável"
    })
    id: number;

    @Column({name: "data_nascimento", type: "date", update: false,
        comment: "Data de nascimento do responsável (para cálculo de idade e afins)"
    })
    birthDate: Date;

    @Column({name: "cpf", type: "varchar", length: 11,
        comment: "CPF do responsável"
    })
    cpf: string;

    @Column(() => Address, {prefix: false})
    address: Address;

    // Controle

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do responsável"
    })
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true,
        comment: "Coluna usada para o Soft Delete, caso tenha um valor, o responsável foi inativado nessa data"
    })
    disableDate: Date;

    // Relacionamentos

    @ManyToMany(() => Baby, baby => baby.guardians)
    ward: Baby[]

    @OneToMany(() => Email, email => email.guardian, {
        cascade: ["soft-remove", "recover", "remove"]
    })
    emails: Email[];

    @OneToMany(() => Phone, phone => phone.guardian, {
        cascade: ["soft-remove", "recover", "remove"]
    })
    phones: Phone[];

}