import { Column, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { SecretaryUser as User } from '../../secretaries/user/SecretaryUser';

/**
 * Componente de Secretaria.
 *
 * Este é um componente de Secretaria que é anexado ao estado ou à secretaria.
 */
export class SecretaryComponent {

    @Column({ name: 'nome', type: 'varchar', length: 255, nullable: true,
        comment: 'Rua em que se encontra esse endereço',
    })
        name: string;

    @IsEmail({}, { each: true })
    @Column({ name: 'emails', type: 'simple-array', nullable: true,
        comment: 'Endereços de email para contato',
    })
        emails?: string[];

    @OneToMany(() => User, (user) => user.zone ? user.zone : user.state)
        users?: User[];

}
