import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailServicoReferenciaFK1860606354023 implements MigrationInterface {
    name = 'EmailServicoReferenciaFK1860606354023';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_servico_referencia\`
            ADD CONSTRAINT \`FK_315b71d40067a1be8d8fedf4369\`
            FOREIGN KEY (\`fk_servico\`) REFERENCES \`servico_referencia\`(\`id_servico\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `email_servico_referencia` DROP FOREIGN KEY `FK_315b71d40067a1be8d8fedf4369`');
        await queryRunner.query('DROP INDEX `IDX_41663cddfe8b58a6356d719ccd` ON `email_servico_referencia`');
    }
}
