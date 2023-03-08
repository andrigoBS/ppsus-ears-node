import { MigrationInterface, QueryRunner } from 'typeorm';

export class FonoaudiologoInstituicaoFK1860606354027 implements MigrationInterface {
    name = 'FonoaudiologoInstituicaoFK1860606354027';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fonoaudiologo_instituicao\`
            ADD CONSTRAINT \`FK_7077e424ccbe231dc2e49024f00\`
            FOREIGN KEY (\`fk_fonoaudiologo\`) REFERENCES \`fonoaudiologo\`(\`id_usuario\`)
            ON DELETE CASCADE ON UPDATE CASCADE`);

        await queryRunner.query(`ALTER TABLE \`fonoaudiologo_instituicao\`
            ADD CONSTRAINT \`FK_f01631078e213c0238f9aeb506a\`
            FOREIGN KEY (\`fk_instituicao\`) REFERENCES \`instituicao\`(\`id_instituicao\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `fonoaudiologo_instituicao` DROP FOREIGN KEY `FK_f01631078e213c0238f9aeb506a`');
        await queryRunner.query('ALTER TABLE `fonoaudiologo_instituicao` DROP FOREIGN KEY `FK_7077e424ccbe231dc2e49024f00`');
        await queryRunner.query('DROP INDEX `IDX_f01631078e213c0238f9aeb506` ON `fonoaudiologo_instituicao`');
        await queryRunner.query('DROP INDEX `IDX_7077e424ccbe231dc2e49024f0` ON `fonoaudiologo_instituicao`');
    }
}
