import { MigrationInterface, QueryRunner } from 'typeorm';

export class BebeResponsavel1760606354026 implements MigrationInterface {
    name = 'BebeResponsavel1760606354026';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bebe_responsavel\` (
                \`fk_bebe\` int NOT NULL,
                \`fk_responsavel\` int NOT NULL, 
            INDEX \`IDX_7a4e62e4f8e13c282c3e2c9c37\` (\`fk_bebe\`), 
            INDEX \`IDX_9e1792f437507f6e3e44a2c142\` (\`fk_responsavel\`), 
            PRIMARY KEY (\`fk_bebe\`, \`fk_responsavel\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `bebe_responsavel`');
    }
}
