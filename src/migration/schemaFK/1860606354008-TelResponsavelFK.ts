import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelResponsavelFK1860606354008 implements MigrationInterface {
    name = 'TelResponsavelFK1860606354008';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tel_responsavel\`
            ADD CONSTRAINT \`FK_4fcfd91762f182b28fb02eccf8c\`
            FOREIGN KEY (\`fk_responsavel\`) REFERENCES \`responsavel\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `tel_responsavel` DROP FOREIGN KEY `FK_4fcfd91762f182b28fb02eccf8c`');
    }
}
