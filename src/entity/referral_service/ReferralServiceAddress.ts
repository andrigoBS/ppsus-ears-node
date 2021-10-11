import {Column, Entity, Index, JoinColumn, OneToOne} from "typeorm";

import {ReferralService} from "./ReferralService";
import {Address} from "../decorators/Address";

@Entity( "end_servico_referencia")
export class ReferralServiceAddress extends Address {

    @Column({name: "fk_servico", select: false,
        comment: "Chave estrangeira do servico de referencia que tem esse email"
    })
    serviceId: number;

    @JoinColumn({name: "fk_servico"})
    @Index("fk_end_servico_referencia_servico_referencia1_idx")
    @OneToOne(() => ReferralService, service => service.address)
    service: ReferralService;

}