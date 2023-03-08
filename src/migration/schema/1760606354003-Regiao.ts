import { MigrationInterface, QueryRunner } from 'typeorm';

export class Regiao1760606354003 implements MigrationInterface {
    name = 'Regiao1760606354003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`regiao\` (
                \`id_regiao\` int NOT NULL AUTO_INCREMENT, 
                \`data_cadastro\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
                \`data_desativado\` datetime(6) NULL, 
                \`fk_estado\` int NOT NULL, 
                \`secretaria_nome\` varchar(255) NULL COMMENT 'Rua em que se encontra esse endereço', 
                \`secretaria_emails\` text NULL COMMENT 'Endereços de email para contato', 
            PRIMARY KEY (\`id_regiao\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `regiao`');
    }
}
