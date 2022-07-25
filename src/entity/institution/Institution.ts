import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum institutiontype
{
    HOSPITAL = 'Hospital',
    MATERNITY = 'Maternidade',
    HOSPITALANDMATERNITY = 'Hospital e Maternidade',
}


@Entity('instituicao')
export class Institution extends BaseEntity
{

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
        name: 'senha', type: 'varchar', length: 255,
        comment: 'Senha', nullable: false
    })
    password: string;

    @Column({
        name: 'confirmacao_senha', type: 'varchar', length: 255,
        comment: 'Confirmação de Senha', nullable: false
    })
    passwordConfirmation: string;

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
        name: 'tipo_instituicao', type: 'enum', update: false, enum: institutiontype,
        comment: 'Tipo de Instituição', nullable: false
    })
    institutionType: institutiontype;

    @Column({
        name: 'email', type: 'varchar', length: 255,
        comment: 'E-mail Preferencial', nullable: false
    })
    email: string;

    @Column({
        name: 'email_alternativo', type: 'varchar', length: 255,
        comment: 'E-mail Alternativo', nullable: true
    })
    alternative_email: string;

    @Column({
        name: 'telefone_institucional', type: 'varchar', length: 255,
        comment: 'Telefone Institucional', nullable: false
    })
    institucional_phone: string;

    @Column({
        name: 'celular_institucional', type: 'varchar', length: 255,
        comment: 'Telefone Celular Institucional', nullable: true
    })
    institucional_cellphone: string;

    @Column({
        name: 'cep', type: 'varchar', length: 8,
        comment: 'CEP', nullable: false
    })
    cep: string;

    @Column({
        name: 'logradouro', type: 'varchar', length: 255,
        comment: 'Logradouro', nullable: false
    })
    public_area: string;


    @Column({
        name: 'estado', type: 'varchar', length: 255,
        comment: 'Estado', nullable: false
    })
    state: string;

    @Column({
        name: 'cidade', type: 'varchar', length: 255,
        comment: 'Cidade', nullable: false
    })
    city: string;

    @Column({
        name: 'numero', type: 'varchar', length: 255,
        comment: 'Número', nullable: true
    })
    number: string;

    @Column({
        name: 'complemento', type: 'varchar', length: 255,
        comment: 'Complemento', nullable: true
    })
    complement: string;

    @Column({
        name: 'nome_responsavel', type: 'varchar', length: 255,
        comment: 'Nome do Responsável', nullable: false
    })
    responsible_name: string;

    @Column({
        name: 'cargo', type: 'varchar', length: 255,
        comment: 'Cargo', nullable: true
    })
    role: string;
}
