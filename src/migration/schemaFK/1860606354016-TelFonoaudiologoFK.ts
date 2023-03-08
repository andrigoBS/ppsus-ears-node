import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelFonoaudiologoFK1860606354016 implements MigrationInterface {
    name = 'TelFonoaudiologoFK1860606354016';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tel_fonoaudiologo\`
            ADD CONSTRAINT \`FK_9a92c59cf9421ca118a21415b74\`
            FOREIGN KEY (\`fk_fonoaudiologo\`) REFERENCES \`fonoaudiologo\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `tel_fonoaudiologo` DROP FOREIGN KEY `FK_9a92c59cf9421ca118a21415b74`');
    }
}
