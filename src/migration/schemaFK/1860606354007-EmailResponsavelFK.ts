import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailResponsavelFK1860606354007 implements MigrationInterface {
    name = 'EmailResponsavelFK1860606354007';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_responsavel\`
            ADD CONSTRAINT \`FK_44688b0e148ecf48ec20b3088f8\`
            FOREIGN KEY (\`fk_responsavel\`) REFERENCES \`responsavel\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `email_responsavel` DROP FOREIGN KEY `FK_44688b0e148ecf48ec20b3088f8`');
        await queryRunner.query('DROP INDEX `IDX_34f1e858a86d2a2397ccb7af9b` ON `email_responsavel`');
    }
}
