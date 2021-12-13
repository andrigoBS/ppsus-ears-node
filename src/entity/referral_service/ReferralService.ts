import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";

import {ReferralServiceEmail as Email} from "./ReferralServiceEmail";
import {ReferralServicePhone as Phone} from "./ReferralServicePhone";
import {AddressComponent as Address} from "../decorators/components/Address";

@Entity( "servico_referencia")
export class ReferralService extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_servico",
        comment: "Chave primaria do servico de referencia"
    })
    id: number;

    @Column({name: "nome_fantasia", type: "varchar", length: 255,
        comment: "Nome fantasia do endereço de referencia"
    })
    name: string;

    @Column({name: "razao_social", type: "varchar", length: 255, nullable: true,
        comment: "Razão social do endereço de referencia"
    })
    socialName: string;

    @Column({name: "cnpj", type: "varchar", length: 13, nullable: true,
        comment: "CNPJ do servico de referencia"
    })
    cnpj: string;

    @Column({name: "cnes", type: "varchar", length: 7, nullable: true})
    cnes: string;

    @Column({name: "is_sus", type: "boolean", default: false,
        comment: "Se o serviço de referencia é referente ao SUS caso 1 ou Privado caso 0"
    })
    isSus: boolean;

    @Column(() => Address, {prefix: false})
    address: Address;

    // Controle

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do serviço de referencia"
    })
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true,
        comment: "Coluna usada para o Soft Delete, caso tenha um valor, o serviço de referencia foi inativado nessa data"
    })
    disableDate: Date;

    // Relacionamentos

    @OneToMany(() => Email, email => email.service, {
        cascade: ["soft-remove", "recover", "remove"]
    })
    emails: Email[];

    @OneToMany(() => Phone, phone => phone.service, {
        cascade: ["soft-remove", "recover", "remove"]
    })
    phones: Phone[];

}