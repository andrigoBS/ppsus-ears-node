import { MigrationInterface, QueryRunner } from 'typeorm';

export class RegiaoFK1860606354003 implements MigrationInterface {
    name = 'RegiaoFK1860606354003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`regiao\`
            ADD CONSTRAINT \`FK_eda3deae3e311892ea17a144cd8\`
            FOREIGN KEY (\`fk_estado\`) REFERENCES \`estado\`(\`id_estado\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `regiao` DROP FOREIGN KEY `FK_eda3deae3e311892ea17a144cd8`');
    }
}
