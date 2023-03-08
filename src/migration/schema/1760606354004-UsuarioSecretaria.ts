import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsuarioSecretaria1760606354004 implements MigrationInterface {
    name = 'UsuarioSecretaria1760606354004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario_secretaria\` (
                \`id_usuario\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primária de um usuário. é única apenas dentro de uma tabela.', 
                \`login\` varchar(255) NOT NULL COMMENT 'Login do usuário, definido pelo user, exceto pais que é gerado pelo sistema', 
                \`password\` varchar(255) NOT NULL COMMENT 'password do usuário',
                \`nome_usuario\` varchar(255) NOT NULL COMMENT 'Nome do usuário', 
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do usuário' DEFAULT CURRENT_TIMESTAMP(6), 
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data', 
                \`cargo\` varchar(255) NULL COMMENT 'Cargo', 
                \`fk_secretaria_estado\` int NULL, 
                \`fk_secretaria_regiao\` int NULL, 
            UNIQUE INDEX \`IDX_598ea50144fd99f2795c01c877\` (\`login\`), 
            PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `usuario_secretaria`');
    }
}
