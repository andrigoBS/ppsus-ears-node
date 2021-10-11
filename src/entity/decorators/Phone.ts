import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";

export class Phone extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_tel",
        comment: "have primaria de um telefone"
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

    @Column({name: "whatsapp", type: "boolean", default: false,
        comment: "Diz se o número tem uma conta no whatsapp = 1 ou é fisico = 0"
    })
    isWhatsapp: boolean;

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do telefone"
    })
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true,
        comment: "Coluna usada para o Soft Delete, caso tenha um valor, o telefone foi inativado nessa data"
    })
    disableDate: Date;

}