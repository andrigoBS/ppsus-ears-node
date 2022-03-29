import {Entity, JoinColumn, ManyToOne} from "typeorm";

import {SecretaryUser} from "./SecretaryUser";
import {EmailTemplate as Email} from "../../decorators/templates/EmailTemplate";

@Entity( "email_secretaria")
export class SecretaryEmail extends Email {

    @JoinColumn({name: "fk_usuario"})
    @ManyToOne(() => SecretaryUser, user => user.emails, {
        nullable: false
    })
    user: SecretaryUser;

}