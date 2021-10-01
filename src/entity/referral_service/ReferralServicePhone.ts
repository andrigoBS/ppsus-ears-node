import {
    BaseEntity,
    Column, CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ReferralService} from "./ReferralService";
import {Length} from "class-validator";


@Entity("tel_servico_referencia")
export class ReferralServicePhone extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_tel_servico"})
    id: number;

    @Column({name: "numero", type: "varchar", length: 13})
    @Length(10, 13)
    phoneNumber: string;

    @Column({name: "nome_contato", type: "varchar", length: 45, nullable: true})
    contactName: string;

    @Column({name: "whatsapp", type: "boolean", default: false})
    isWhatsapp: boolean;

    @Index("fk_tel_servico_referencia_servico_referencia1_idx")
    @JoinColumn({name: "id_servico"})
    @ManyToOne(() => ReferralService, service => service.phones, {
        nullable: false
    })
    service: ReferralService;

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

}