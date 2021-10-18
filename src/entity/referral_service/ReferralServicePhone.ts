import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";

import {ReferralService} from "./ReferralService";
import {PhoneTemplate as Phone} from "../decorators/templates/PhoneTemplate";

@Entity("tel_servico_referencia")
export class ReferralServicePhone extends Phone {

    @Column({name: "fk_servico", select: false,
        comment: "Chave estrangeiro do servico de referencia que tem esse telefone"
    })
    serviceId: number;

    @JoinColumn({name: "fk_servico"})
    @ManyToOne(() => ReferralService, service => service.phones, {
        nullable: false
    })
    service: ReferralService;

}