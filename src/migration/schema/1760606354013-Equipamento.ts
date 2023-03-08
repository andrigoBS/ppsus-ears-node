import { MigrationInterface, QueryRunner } from 'typeorm';

export class Equipamento1760606354013 implements MigrationInterface {
    name = 'Equipamento1760606354013';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`equipamento\` (
                \`id_equipamento\` int NOT NULL AUTO_INCREMENT, 
                \`modelo\` varchar(255) NOT NULL COMMENT 'Modelo do equipamento', 
                \`marca\` varchar(255) NOT NULL COMMENT 'Marca do equipamento', 
                \`data_calibracao\` date NOT NULL COMMENT 'Data do último calibramento do equipamento', 
            PRIMARY KEY (\`id_equipamento\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `equipamento`');
    }
}
