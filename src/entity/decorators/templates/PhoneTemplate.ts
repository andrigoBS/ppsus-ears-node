import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";

/**
 * Entidade abstrata representando um telefone.
 *
 * Esta entidade não representa uma tabela no banco, mas serve de
 * template para várias tabelas.
 */
export class PhoneTemplate extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_tel",
        comment: "Chave primaria de um telefone"
    })
    id: number;

    @Column({name: "numero", type: "varchar", length: 13,
        comment: "Número do telefone, DDD + número"
    })
    @Length(10, 13)
    phoneNumber: string;

    @Column({name: "nome_contato", type: "varchar", length: 45, nullable: true,
        comment: "Nome do contato do número telefonico"
    })
    contactName: string;

    @Column({name: "is_whatsapp", type: "boolean", default: false,
        comment: "Diz se o número tem uma conta no whatsapp"
    })
    isWhatsapp: boolean;

    @Column({name: "is_principal", type: "boolean", default: false,
        comment: "Marca o telefone principal da conta"
    })
    isMainPhone: boolean;

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do telefone"
    })
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true,
        comment: "Coluna usada para o Soft Delete, caso tenha um valor, o telefone foi inativado nessa data"
    })
    disableDate: Date;

}