import { MigrationInterface, QueryRunner } from 'typeorm';

export class Estado1760606354005 implements MigrationInterface {
    name = 'Estado1760606354005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`estado\` (
                \`id_estado\` int NOT NULL AUTO_INCREMENT, 
                \`codigo_ibge\` int NOT NULL, 
                \`nome\` varchar(20) NOT NULL, 
                \`uf\` varchar(2) NOT NULL, 
                \`secretaria_nome\` varchar(255) NULL COMMENT 'Rua em que se encontra esse endereço', 
                \`secretaria_emails\` text NULL COMMENT 'Endereços de email para contato', 
            UNIQUE INDEX \`IDX_002b78d13edfb2d040f9b4eced\` (\`codigo_ibge\`), 
            UNIQUE INDEX \`IDX_97755db4b1b5aebf5275143e9b\` (\`uf\`), 
            PRIMARY KEY (\`id_estado\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX `IDX_97755db4b1b5aebf5275143e9b` ON `estado`');
        await queryRunner.query('DROP INDEX `IDX_002b78d13edfb2d040f9b4eced` ON `estado`');
        await queryRunner.query('DROP TABLE `estado`');
    }
}
