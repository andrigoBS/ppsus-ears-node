import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";

import {Guardian} from "./Guardian";
import {EmailTemplate as Email} from "../decorators/templates/EmailTemplate";

@Entity( "email_servico_referencia")
export class GuardianEmail extends Email {

    @Column({name: "fk_servico", select: false,
        comment: "Chave estrangeira do responsável que tem esse email"
    })
    serviceId: number;

    @JoinColumn({name: "fk_responsavel"})
    @ManyToOne(() => Guardian, guardian => guardian.emails, {
        nullable: false
    })
    guardian: Guardian;

}