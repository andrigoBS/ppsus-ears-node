import {Column, Entity, Index, JoinColumn, ManyToOne} from "typeorm";

import {ReferralService} from "./ReferralService";
import {Phone} from "../decorators/Phone";

@Entity("tel_servico_referencia")
export class ReferralServicePhone extends Phone {

    @Column({name: "fk_servico", select: false,
        comment: "Chave estrangeiro do servico de referencia que tem esse telefone"
    })
    serviceId: number;

    @Index("fk_tel_servico_referencia_servico_referencia1_idx")
    @JoinColumn({name: "fk_servico"})
    @ManyToOne(() => ReferralService, service => service.phones, {
        nullable: false
    })
    service: ReferralService;

}