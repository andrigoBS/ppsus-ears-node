import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailSecretaria1760606354002 implements MigrationInterface {
    name = 'EmailSecretaria1760606354002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`email_secretaria\` (
                \`id_email\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primaria de um email', 
                \`email\` varchar(255) NOT NULL COMMENT 'Endereço de email para contato', 
                \`is_principal\` tinyint NOT NULL COMMENT 'Marca o email principal da conta' DEFAULT 0, 
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do email' DEFAULT CURRENT_TIMESTAMP(6), 
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o email foi inativado nessa data', 
                \`fk_usuario\` int NOT NULL COMMENT 'Chave primária de um usuário. é única apenas dentro de uma tabela.', 
            UNIQUE INDEX \`IDX_7be91b49157d8838ca8a0bd0ac\` (\`email\`), 
            PRIMARY KEY (\`id_email\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `email_secretaria`');
    }
}
