import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Institution } from '../institution/Institution';
import { TherapistEmail as Email } from './TherapistEmail';
import { TherapistPhone as Phone } from './TherapistPhone';
import { UserTemplate as User } from '../decorators/templates/UserTemplate';

export enum TherapistXP {
    LESS_ONE = 'Menos de 1 ano',
    ONE_TO_THREE = 'De 1 a 3 anos',
    THREE_TO_FIVE = 'De 3 a 5 anos',
    MORE_FIVE = 'Mais de 5 anos',
}

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

    @JoinTable ({ name: 'fonoaudiologo_instituicao',
        joinColumn: { name: 'fk_fonoaudiologo' }, inverseJoinColumn: { name: 'fk_instituicao' },
    })
    @ManyToMany(() => Institution, (institution) => institution.therapists)
    institutions: Institution;
}
