import {BaseEntity, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn} from 'typeorm';

/**
 * Entidade abstrata representando um usuário.
 *
 * Esta entidade não representa uma tabela no banco, mas serve de
 * template para várias tabelas.
 */
export abstract class UserTemplate extends BaseEntity {

    @PrimaryGeneratedColumn({name: 'id_usuario',
        comment: 'Chave primária de um usuário. é única apenas dentro de uma tabela.',
    })
    id: number;

    @Column()
    password: string;

    // Controle

    @CreateDateColumn({name: 'data_cadastro', type: 'datetime',
        comment: 'Data de cadastro do usuário',
    })
    registrationDate: Date;

    @DeleteDateColumn({name: 'data_desativado', type: 'datetime', nullable: true,
        comment: 'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data',
    })
    disableDate: Date;

    @BeforeInsert()
    hashPassword() {
        console.log(this);
    }

}
