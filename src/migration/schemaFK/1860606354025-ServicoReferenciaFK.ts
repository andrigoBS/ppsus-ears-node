import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServicoReferenciaFK1860606354025 implements MigrationInterface {
    name = 'ServicoReferenciaFK1860606354025';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`servico_referencia\`
            ADD CONSTRAINT \`FK_b64e7693a00951e8c517cc7fcf8\`
            FOREIGN KEY (\`fk_municipio\`) REFERENCES \`municipio\`(\`id_municipio\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `servico_referencia` DROP FOREIGN KEY `FK_b64e7693a00951e8c517cc7fcf8`');
    }
}
