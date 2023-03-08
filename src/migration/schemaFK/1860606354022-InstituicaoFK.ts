import { MigrationInterface, QueryRunner } from 'typeorm';

export class InstituicaoFK1860606354022 implements MigrationInterface {
    name = 'InstituicaoFK1860606354022';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`instituicao\`
            ADD CONSTRAINT \`FK_39217a93fde8a514cdc2509fdb2\`
            FOREIGN KEY (\`fk_municipio\`) REFERENCES \`municipio\`(\`id_municipio\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `instituicao` DROP FOREIGN KEY `FK_39217a93fde8a514cdc2509fdb2`');
    }
}
