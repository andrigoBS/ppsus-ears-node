import { Column, Entity, OneToMany } from 'typeorm';
import { TherapistEmail as Email } from './TherapistEmail';
import { TherapistPhone as Phone } from './TherapistPhone';
import { UserTemplate as User } from '../decorators/templates/UserTemplate';

/**
 * O profissional de fonoaudiologia que ira atender o bebe
 */
@Entity('fonoaudiologo')
export class Therapist extends User {
    @Column({
        name: 'crfa', type: 'varchar', length: 8,
        comment: 'crfa', nullable: false
    })
    crfa: string;

    @Column({
        name: 'tempo_experiencia', type: 'json',
        comment: 'Json do tempo de experiência', nullable: false
    })
    xp: string;

    // Relacionamentos

    @OneToMany(() => Email, (email) => email.therapist, {
        cascade: ['soft-remove', 'recover', 'remove'],
    })
    emails: Email[];

    @OneToMany(() => Phone, (phone) => phone.therapist, {
        cascade: ['soft-remove', 'recover', 'remove'],
    })
    phones: Phone[];
}
