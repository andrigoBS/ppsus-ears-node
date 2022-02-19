import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";

import {ReferralService} from "./ReferralService";
import {EmailTemplate as Email} from "../decorators/templates/EmailTemplate";

@Entity( "email_servico_referencia")
export class ReferralServiceEmail extends Email {

    // @Column({name: "fk_servico", select: false,
    //     comment: "Chave estrangeira do servico de referencia que tem esse email"
    // })
    // serviceId: number;

    @JoinColumn({name: "fk_servico"})
    @ManyToOne(() => ReferralService, service => service.emails, {
        nullable: false
    })
    service: ReferralService;

}