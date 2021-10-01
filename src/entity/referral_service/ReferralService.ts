import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    DeleteDateColumn,
    OneToMany,
    CreateDateColumn
} from "typeorm";

import {ReferralServiceEmail as Email} from "./ReferralServiceEmail";
import {ReferralServiceAddress as Address} from "./ReferralServiceAddress";
import {ReferralServicePhone as Phone} from "./ReferralServicePhone";

@Entity( "referral_service")
export class ReferralService extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_servico"})
    id: number;

    @Column({name: "nome_fantasia", type: "varchar", length: 255})
    name: string;

    @Column({name: "razao_social", type: "varchar", length: 255, nullable: true})
    socialName: string;

    @Column({name: "cnpj", type: "varchar", length: 13, nullable: true})
    cnpj: string;

    @Column({name: "cnes", type: "varchar", length: 7, nullable: true})
    cnes: string;

    @Column({name: "isSus", type: "boolean", default: false})
    isSus: boolean;

    @OneToMany(() => Email, email => email.service, {
        cascade: ["soft-remove", "recover"]
    })
    emails: Email[];

    @OneToMany(() => Address, address => address.service)
    addresses: Address[];

    @OneToMany(() => Phone, phone => phone.service, {
        cascade: ["soft-remove", "recover"]
    })
    phones: Phone[];

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

}