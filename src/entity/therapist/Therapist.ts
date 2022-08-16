import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Institution } from '../institution/Institution';
import { Triage } from '../triage/Triage';
import { TherapistEmail as Email } from './TherapistEmail';
import { TherapistPhone as Phone } from './TherapistPhone';
import { UserTemplate as User } from '../decorators/templates/UserTemplate';
import { Orientation } from '../orientation/Orientation';

export type TherapistXPString = 'LESS_ONE' | 'ONE_TO_THREE' | 'THREE_TO_FIVE' | 'MORE_FIVE';
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

    @Column({ name: 'tempo_experiencia', type: 'enum', update: false, enum: TherapistXP,
        comment: 'Json do tempo de experiência',
    })
    xp: TherapistXP;

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
    institutions: Institution[];

    @OneToMany(() => Orientation, (orientation) => orientation.therapist)
    orientations: Orientation;

    @OneToMany(() => Triage, (triage) => triage.therapist)
    triages: Triage;
}
