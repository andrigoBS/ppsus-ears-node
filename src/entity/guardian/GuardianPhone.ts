import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Guardian } from './Guardian';
import { PhoneTemplate as Phone } from '../decorators/templates/PhoneTemplate';

@Entity('tel_responsavel')
export class GuardianPhone extends Phone {

    @JoinColumn({ name: 'fk_responsavel' })
    @ManyToOne(() => Guardian, (guardian) => guardian.phones, {
        nullable: false,
    })
        guardian: Guardian;

}
