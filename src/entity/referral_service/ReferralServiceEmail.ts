import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    DeleteDateColumn,
    ManyToOne,
    Index,
    JoinColumn, CreateDateColumn
} from "typeorm";
import {IsEmail} from "class-validator";

import {ReferralService} from "./ReferralService";

@Entity( "email_servico_referencia")
export class ReferralServiceEmail extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_email"})
    id: number;

    @IsEmail()
    @Column({name: "email", type: "varchar", length: 255, unique: true})
    email: string;

    @Column({name: "nome_contato", type: "varchar", length: 45, nullable: true})
    contactName: string;

    @JoinColumn({name: "id_servico"})
    @Index("fk_email_servico_referencia_servico_referencia_idx")
    @ManyToOne(() => ReferralService, service => service.emails, {
        nullable: false
    })
    service: ReferralService;

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

}