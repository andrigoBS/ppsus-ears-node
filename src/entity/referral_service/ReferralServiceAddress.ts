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

@Entity( "end_servico_referencia")
export class ReferralServiceAddress extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_endereco_servico"})
    id: number;

    @Column({name: "cidade", type: "varchar", length: 255})
    city: string;

    @Column({name: "rua", type: "varchar", length: 255})
    street: string;

    @Column({name: "numero", type: "int", nullable: true})
    number: number;

    @Column({name: "complemento", type: "varchar", length: 255, nullable: true})
    adjunct: string;

    @Column({name: "CEP", type: "varchar", length: 8})
    cep: string;

    @Index("fk_end_servico_referencia_servico_referencia1_idx")
    @ManyToOne(() => ReferralService, service => service.addresses)
    @JoinColumn({name: "id_servico"})
    service: ReferralService;

    @CreateDateColumn({name: "data_cadastro", type: "datetime"})
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true})
    disableDate: Date;

}