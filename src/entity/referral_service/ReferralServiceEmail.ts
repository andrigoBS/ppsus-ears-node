import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ReferralService } from './ReferralService';
import { EmailTemplate as Email } from '../decorators/templates/EmailTemplate';

@Entity('email_servico_referencia')
export class ReferralServiceEmail extends Email {

    @JoinColumn({ name: 'fk_servico' })
    @ManyToOne(() => ReferralService, (service) => service.emails, {
        nullable: false,
    })
        service: ReferralService;

}
