import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";

import {Guardian} from "./Guardian";
import {PhoneTemplate as Phone} from "../decorators/templates/PhoneTemplate";

@Entity("tel_servico_referencia")
export class GuardianPhone extends Phone {

    @Column({name: "fk_servico", select: false,
        comment: "Chave estrangeiro do servico de referencia que tem esse telefone"
    })
    serviceId: number;

    @JoinColumn({name: "fk_servico"})
    @ManyToOne(() => Guardian, guardian => guardian.phones, {
        nullable: false
    })
    guardian: Guardian;

}