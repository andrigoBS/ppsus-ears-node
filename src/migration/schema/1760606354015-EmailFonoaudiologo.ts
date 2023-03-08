import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailFonoaudiologo1760606354015 implements MigrationInterface {
    name = 'EmailFonoaudiologo1760606354015';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`email_fonoaudiologo\` (
                \`id_email\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primaria de um email', 
                \`email\` varchar(255) NOT NULL COMMENT 'Endereço de email para contato', 
                \`is_principal\` tinyint NOT NULL COMMENT 'Marca o email principal da conta' DEFAULT 0, 
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do email' DEFAULT CURRENT_TIMESTAMP(6), 
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o email foi inativado nessa data', 
                \`fk_fonoaudiologo\` int NOT NULL COMMENT 'Chave primária de um usuário. é única apenas dentro de uma tabela.', 
            UNIQUE INDEX \`IDX_a9b0ce7b63e546a1f8b2f7196b\` (\`email\`), 
            PRIMARY KEY (\`id_email\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `email_fonoaudiologo`');
    }
}
