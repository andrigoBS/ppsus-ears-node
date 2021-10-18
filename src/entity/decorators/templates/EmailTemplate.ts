import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";

export abstract class EmailTemplate extends BaseEntity {

    @PrimaryGeneratedColumn({name: "id_email",
        comment: "Chave primaria de um email"
    })
    id: number;

    @IsEmail()
    @Column({name: "email", type: "varchar", length: 255, unique: true,
        comment: "Endereço de email para contato"
    })
    email: string;

    @Column({name: "is_principal", type: "boolean", default: false})
    isMainEmail: boolean;

    @CreateDateColumn({name: "data_cadastro", type: "datetime",
        comment: "Data de cadastro do email"
    })
    registrationDate: Date;

    @DeleteDateColumn({name: "data_desativado", type: "datetime", nullable: true,
        comment: "Coluna usada para o Soft Delete, caso tenha um valor, o email foi inativado nessa data"
    })
    disableDate: Date;

}