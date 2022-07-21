import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserTemplate as User } from '../../decorators/templates/UserTemplate';
import { SecretaryEmail as Email } from './SecretaryEmail';
import { State } from '../State';
import { Zone } from '../Zone';

@Entity('usuario_secretaria')
export class SecretaryUser extends User {

    @OneToMany(() => Email, (email) => email.user, {
        cascade: ['soft-remove', 'recover', 'remove'],
    })
        emails: Email[];

    @JoinColumn({ name: 'fk_secretaria_estado' })
    @ManyToOne(() => State, (state) => state.secretary.users)
        state: State;

    @JoinColumn({ name: 'fk_secretaria_regiao' })
    @ManyToOne(() => Zone, (zone) => zone.secretary.users)
        zone: Zone;

}
