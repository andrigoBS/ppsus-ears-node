import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailServicoReferencia1760606354023 implements MigrationInterface {
    name = 'EmailServicoReferencia1760606354023';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`email_servico_referencia\` (
                \`id_email\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primaria de um email',
                \`email\` varchar(255) NOT NULL COMMENT 'Endereço de email para contato',
                \`is_principal\` tinyint NOT NULL COMMENT 'Marca o email principal da conta' DEFAULT 0,
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do email' DEFAULT CURRENT_TIMESTAMP(6),
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o email foi inativado nessa data',
                \`fk_servico\` int NOT NULL COMMENT 'Chave primária do servico de referencia', 
            UNIQUE INDEX \`IDX_41663cddfe8b58a6356d719ccd\` (\`email\`), 
            PRIMARY KEY (\`id_email\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `email_servico_referencia`');
    }
}
