import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailInstituicaoFK1860606354019 implements MigrationInterface {
    name = 'EmailInstituicaoFK1860606354019';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_instituicao\`
            ADD CONSTRAINT \`FK_21a0043c93e1a2bc7d318d94000\`
            FOREIGN KEY (\`fk_instituicao\`) REFERENCES \`usuario_instituicao\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `email_instituicao` DROP FOREIGN KEY `FK_21a0043c93e1a2bc7d318d94000`');
        await queryRunner.query('DROP INDEX `IDX_6052810a1e0b920584f9ec89c1` ON `email_instituicao`');
    }
}
