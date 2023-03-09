import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsuarioInstituicao1760606354021 implements MigrationInterface {
    name = 'UsuarioInstituicao1760606354021';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario_instituicao\` (
                \`id_usuario\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primária de um usuário. é única apenas dentro de uma tabela.', 
                \`login\` varchar(255) NOT NULL COMMENT 'Login do usuário, definido pelo user, exceto pais que é gerado pelo sistema', 
                \`resetar_senha\` int DEFAULT 0 COMMENT 'Força a mudança de senha no próximo login',
                \`password\` varchar(255) NOT NULL COMMENT 'password do usuário', 
                \`nome_usuario\` varchar(255) NOT NULL COMMENT 'Nome do usuário', 
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do usuário' DEFAULT CURRENT_TIMESTAMP(6), 
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data', 
                \`cargo\` varchar(255) NULL COMMENT 'Cargo', 
                \`fk_instituicao\` int NOT NULL COMMENT 'Chave primária da instituição', 
            UNIQUE INDEX \`IDX_ed675152693ba21f7728bf4cb8\` (\`login\`), 
            PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `usuario_instituicao`');
    }
}
