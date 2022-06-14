import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {AddressComponent as Address} from '../decorators/components/Address';

@Entity('instituicao')
export class Institution extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id_instituicao',
        comment: 'Chave primária da instituição',
    })
    id: number;

    @Column({
        name: 'nome_fantasia', type: 'varchar', length: 255,
        comment: 'Nome Fantasia (Comercial) da instituição',
    })
    tradingName: string;

    @Column({
        name: 'razao_social', type: 'varchar', length: 255,
        comment: 'Razão Social da instituição',
    })
    companyName: string;

    @Column({
        name: 'is_maternidade', type: 'boolean',
        comment: 'Define se a instituição é ou não uma maternidade',
    })
    isMaternity: boolean;

    @Column(() => Address, {prefix: false})
    address: Address;

}
