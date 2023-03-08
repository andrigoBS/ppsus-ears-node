import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelInstituicaoFK1860606354020 implements MigrationInterface {
    name = 'TelInstituicaoFK1860606354020';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tel_instituicao\`
            ADD CONSTRAINT \`FK_e46e5b2959d12692338115e256c\`
            FOREIGN KEY (\`fk_instituicao\`) REFERENCES \`usuario_instituicao\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `tel_instituicao` DROP FOREIGN KEY `FK_e46e5b2959d12692338115e256c`');
    }
}
