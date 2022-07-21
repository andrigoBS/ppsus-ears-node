import { BaseEntity, Column, Entity} from 'typeorm';

export enum institution
{
    HOSPITAL = 'Hospital',
    MATERNITY = 'Maternidade',
    HOSPITALANDMATERNITY = 'Hospital e Maternidade',
}


@Entity('instituicao')
export class Institution extends BaseEntity
{

    @Column({
        name: 'nome_instituicao', type: 'varchar', length: 255,
        comment: 'Nome instituição', nullable: false
    })
    institutionName: string;

    @Column({
        name: 'senha', type: 'varchar', length: 255,
        comment: 'Senha*', 
    })
    password: string;

    @Column({
        name: 'confirmacao_senha', type: 'varchar', length: 255,
        comment: 'Confirmação de Senha*',
    })
    passwordConfirmation: string;

    @Column({
        name: 'cnes', type: 'varchar', length: 11,
        comment: 'CNES*',
    })
    cnes: string;

    @Column({
        name: 'cnpj', type: 'varchar', length: 14,
        comment: 'CNPJ',
    })
    cnpj: string;

    @Column({
        name: 'tipo_instituicao', type: 'enum', update: false, enum: institution,
        comment: 'Tipo de Instituição',
    })
    institutionType: institution;

    @Column({
        name: 'email', type: 'varchar', length: 255,
        comment: 'E-mail Preferencial*',
    })
    email: string;

    @Column({
        name: 'email_alternativo', type: 'varchar', length: 255,
        comment: 'E-mail Alternativo',
    })
    alternative_email: string;

    @Column({
        name: 'telefone_institucional', type: 'varchar', length: 255,
        comment: 'Telefone Institucional*',
    })
    institucional_phone: string;

    @Column({
        name: 'celular_institucional', type: 'varchar', length: 255,
        comment: 'Telefone Celular Institucional',
    })
    institucional_cellphone: string;

    @Column({
        name: 'cep', type: 'varchar', length: 8,
        comment: 'CEP*',
    })
    cep: string;

    @Column({
        name: 'logradouro', type: 'varchar', length: 255,
        comment: 'Logradouro*',
    })
    public_area: string;


    @Column({
        name: 'estado', type: 'varchar', length: 255,
        comment: 'Estado*',
    })
    state: string;

    @Column({
        name: 'cidade', type: 'varchar', length: 255,
        comment: 'Cidade*',
    })
    city: string;

    @Column({
        name: 'numero', type: 'varchar', length: 255,
        comment: 'Número',
    })
    number: string;

    @Column({
        name: 'complemento', type: 'varchar', length: 255,
        comment: 'Complemento',
    })
    complement: string;

    @Column({
        name: 'nome_responsavel', type: 'varchar', length: 255,
        comment: 'Nome do Responsável*',
    })
    responsible_name: string;

    @Column({
        name: 'cargo', type: 'varchar', length: 255,
        comment: 'Cargo',
    })
    role: string;

}
