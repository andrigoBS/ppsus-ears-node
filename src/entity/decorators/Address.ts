import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {City} from "../geography/City";

/*
 * Separei as definições dos campos de uso e dos campos de controle porque
 * eu e o gabriel ainda não definimos se o serviço de referência vai ter uma
 * tabela de endereço ou se as informações de endereço vão estar junto com a
 * tabela do serviço.
 *
 * Separando assim é possível manter os dois padrões (endereço embutido na tabela
 * e tabela de endereços.
 *
 * pra entender melhor leia https://typeorm.io/#/embedded-entities e https://typeorm.io/#/entity-inheritance
 */
export class AddressComponent extends BaseEntity {
    @Column({name: "rua", type: "varchar", length: 255,
        comment: "Rua em que se encontra esse endereço"
    })
    street: string;

    @Column({name: "numero", type: "int",
        comment: "Numero do estabelecimento"
    })
    number: number;

    @Column({name: "complemento", type: "varchar", length: 255, nullable: true,
        comment: "Complemento para o endereço"
    })
    adjunct: string;

    @Column({name: "CEP", type: "varchar", length: 8,
        comment: "CEP do endereço"
    })
    cep: string;

    @Column({name: "fk_municipio", select: false,
        comment: "Chave estrangeira da cidade a qual o endereço pertence"
    })
    cityId: number;

    @JoinColumn({name: "fk_municipio"})
    @Index("`fk_endereco_municipio1_idx")
    @ManyToOne(() => City)
    city: City;
}

export class Address extends AddressComponent {

    @PrimaryGeneratedColumn({name: "id_endereco",
        comment: "Chave primaria do endereço"
    })
    id: number;

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do endereço"
    })
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true,
        comment: "Coluna usada para o Soft Delete, caso tenha um valor, o endereço foi inativado nessa data"
    })
    disableDate: Date;

}