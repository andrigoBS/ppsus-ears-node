import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SecretaryPhone as Phone } from './SecretaryPhone';
import { SecretaryEmail as Email } from './SecretaryEmail';
import { State } from '../State';
import { UserTemplate as User } from '../../decorators/templates/UserTemplate';
import { Zone } from '../Zone';

@Entity('usuario_secretaria')
export class SecretaryUser extends User {

    @Column({
        name: 'cargo', type: 'varchar', length: 255,
        comment: 'Cargo', nullable: true
    })
    role: string;

    @OneToMany(() => Email, (email) => email.user, {
        cascade: ['soft-remove', 'recover', 'remove'],
    })
    emails: Email[];

    @OneToMany(() => Phone, (phone) => phone.user, {
        cascade: ['soft-remove', 'recover', 'remove'],
    })
    phones: Phone[];

    @JoinColumn({ name: 'fk_secretaria_estado' })
    @ManyToOne(() => State, (state) => state.secretary.users)
    state: State;

    @JoinColumn({ name: 'fk_secretaria_regiao' })
    @ManyToOne(() => Zone, (zone) => zone.secretary.users)
    zone: Zone;

}
