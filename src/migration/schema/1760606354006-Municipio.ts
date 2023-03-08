import { MigrationInterface, QueryRunner } from 'typeorm';

export class Municipio1760606354006 implements MigrationInterface {
    name = 'Municipio1760606354006';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`municipio\` (
                \`id_municipio\` int NOT NULL AUTO_INCREMENT, 
                \`nome\` varchar(48) NOT NULL, 
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do município' DEFAULT CURRENT_TIMESTAMP(6), 
                \`fk_regiao\` int NULL, 
                \`fk_state\` int NOT NULL, 
            PRIMARY KEY (\`id_municipio\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `municipio`');
    }
}
