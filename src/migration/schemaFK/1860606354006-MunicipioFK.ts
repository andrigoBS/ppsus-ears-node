import { MigrationInterface, QueryRunner } from 'typeorm';

export class MunicipioFK1860606354006 implements MigrationInterface {
    name = 'MunicipioFK1860606354006';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`municipio\`
            ADD CONSTRAINT \`FK_fea5bb63901e034be0275ee274a\`
            FOREIGN KEY (\`fk_regiao\`) REFERENCES \`regiao\`(\`id_regiao\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE \`municipio\`
            ADD CONSTRAINT \`FK_bb8c58fa88607524fae8a9c003c\`
            FOREIGN KEY (\`fk_state\`) REFERENCES \`estado\`(\`id_estado\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `municipio` DROP FOREIGN KEY `FK_bb8c58fa88607524fae8a9c003c`');
        await queryRunner.query('ALTER TABLE `municipio` DROP FOREIGN KEY `FK_fea5bb63901e034be0275ee274a`');
    }
}
