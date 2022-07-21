import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Guardian } from './Guardian';
import { EmailTemplate as Email } from '../decorators/templates/EmailTemplate';

@Entity('email_responsavel')
export class GuardianEmail extends Email {

    @JoinColumn({ name: 'fk_responsavel' })
    @ManyToOne(() => Guardian, (guardian) => guardian.emails, {
        nullable: false,
    })
        guardian: Guardian;

}
