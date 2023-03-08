import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrientacaoFK1860606354017 implements MigrationInterface {
    name = 'OrientacaoFK1860606354017';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orientacao\`
            ADD CONSTRAINT \`FK_8d0f05c8c0ea0e9cef23ada2cd3\`
            FOREIGN KEY (\`fk_fonoaudiologo\`) REFERENCES \`fonoaudiologo\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `orientacao` DROP FOREIGN KEY `FK_8d0f05c8c0ea0e9cef23ada2cd3`');
    }
}
