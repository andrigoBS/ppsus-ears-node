import {Column, Entity, Index, JoinColumn, ManyToOne} from "typeorm";

import {ReferralService} from "./ReferralService";
import {Email} from "../decorators/Email";

@Entity( "email_servico_referencia")
export class ReferralServiceEmail extends Email {

    @Column({name: "fk_servico", select: false,
        comment: "Chave estrangeira do servico de referencia que tem esse email"
    })
    serviceId: number;

    @JoinColumn({name: "fk_servico"})
    @Index("fk_email_servico_referencia_servico_referencia_idx")
    @ManyToOne(() => ReferralService, service => service.emails, {
        nullable: false
    })
    service: ReferralService;

}