import { ValidateNested } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AddressComponent as Address } from '../decorators/components/Address';
import { Therapist } from '../therapist/Therapist';
import { Triage } from '../triage/Triage';
import { InstitutionUser as User } from './InstitutionUser';

export type InstitutionString = 'HOSPITAL' | 'MATERNITY' | 'HOSPITAL_AND_MATERNITY';
export enum InstitutionType
{
    HOSPITAL = 'Hospital',
    MATERNITY = 'Maternidade',
    HOSPITAL_AND_MATERNITY = 'Hospital e Maternidade',
}

@Entity('instituicao')
export class Institution extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id_instituicao',
        comment: 'Chave primária da instituição',
    })
    id: number;

    @Column({
        name: 'nome_instituicao', type: 'varchar', length: 255,
        comment: 'Nome instituição', nullable: false
    })
    institutionName: string;

    @Column({
        name: 'cnes', type: 'varchar', length: 11,
        comment: 'CNES', nullable: false
    })
    cnes: string;

    @Column({
        name: 'cnpj', type: 'varchar', length: 14,
        comment: 'CNPJ', nullable: true
    })
    cnpj: string;

    @Column({
        name: 'tipo_instituicao', type: 'enum', update: false, enum: InstitutionType,
        comment: 'Tipo de Instituição', nullable: false
    })
    institutionType: InstitutionType;

    @ValidateNested()
    @Column(() => Address, { prefix: false })
    address: Address;

    // Relacionamentos

    @OneToMany(() => User, (user) => user.institution)
    users: User[];

    @ManyToMany(() => Therapist, (therapist) => therapist.institutions)
    therapists: Therapist[];

    @OneToMany(() => Triage, (triage) => triage.therapist)
    triages: Triage;
}
