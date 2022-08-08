import { ValidateNested } from 'class-validator';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AddressComponent as Address } from '../decorators/components/Address';
import { Baby } from '../baby/Baby';
import { GuardianEmail as Email } from './GuardianEmail';
import { GuardianPhone as Phone } from './GuardianPhone';
import { UserTemplate as User } from '../decorators/templates/UserTemplate';

@Entity('responsavel')
export class Guardian extends User {

    @Column({ name: 'data_nascimento', type: 'date', update: false,
        comment: 'Data de nascimento do responsável (para cálculo de idade e afins)',
    })
    birthDate: Date;

    @Column({ name: 'cpf', type: 'varchar', length: 11, unique: true,
        comment: 'CPF do responsável',
    })
    cpf: string;

    @ValidateNested()
    @Column(() => Address, { prefix: false })
    address: Address;

    // Relacionamentos

    @ManyToMany(() => Baby, (baby) => baby.guardians)
    ward: Baby[];

    @OneToMany(() => Email, (email) => email.guardian, {
        cascade: ['soft-remove', 'recover', 'remove'],
    })
    emails: Email[];

    @OneToMany(() => Phone, (phone) => phone.guardian, {
        cascade: ['soft-remove', 'recover', 'remove'],
    })
    phones: Phone[];

}
