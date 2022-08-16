import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import CryptoHelper from '../../../helpers/CryptoHelper';

/**
 * Entidade abstrata representando um usuário.
 *
 * Esta entidade não representa uma tabela no banco, mas serve de
 * template para várias tabelas.
 */
export abstract class UserTemplate extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id_usuario',
        comment: 'Chave primária de um usuário. é única apenas dentro de uma tabela.',
    })
    id: number;

    @Column({
        name: 'login', type: 'varchar', length: 255, nullable: false, unique: true, update: false,
        comment: 'Login do usuário, definido pelo user, exceto pais que é gerado pelo sistema'
    })
    login: string;

    @Column({
        name: 'password', type: 'varchar', length: 255,
        comment: 'password do usuário', nullable: false
    })
    password: string;

    @Column ({
        name:'resetar_senha', type: 'boolean', default: false,
        comment: 'Força a mudança de senha no próximo login'
    })
    forcePasswordReset: boolean;

    @Column({
        name: 'nome_usuario', type: 'varchar', length: 255,
        comment: 'Nome do usuário', nullable: false
    })
    name: string;

    // Controle

    @CreateDateColumn({ name: 'data_cadastro', type: 'datetime',
        comment: 'Data de cadastro do usuário',
    })
    registrationDate: Date;

    @DeleteDateColumn({ name: 'data_desativado', type: 'datetime', nullable: true,
        comment: 'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data',
    })
    disableDate: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = CryptoHelper.encrypt(this.password);
    }
}
