import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailFonoaudiologoFK1860606354015 implements MigrationInterface {
    name = 'EmailFonoaudiologoFK1860606354015';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_fonoaudiologo\`
            ADD CONSTRAINT \`FK_3f8d8d5fcbecf57d288c0cf4629\`
            FOREIGN KEY (\`fk_fonoaudiologo\`) REFERENCES \`fonoaudiologo\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `email_fonoaudiologo` DROP FOREIGN KEY `FK_3f8d8d5fcbecf57d288c0cf4629`');
        await queryRunner.query('DROP INDEX `IDX_a9b0ce7b63e546a1f8b2f7196b` ON `email_fonoaudiologo`');
    }
}
