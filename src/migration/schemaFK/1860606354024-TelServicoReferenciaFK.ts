import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelServicoReferenciaFK1860606354024 implements MigrationInterface {
    name = 'TelServicoReferenciaFK1860606354024';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tel_servico_referencia\`
            ADD CONSTRAINT \`FK_b813f5f461c807672b102ac7dd9\`
            FOREIGN KEY (\`fk_servico\`) REFERENCES \`servico_referencia\`(\`id_servico\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `tel_servico_referencia` DROP FOREIGN KEY `FK_b813f5f461c807672b102ac7dd9`');
    }
}
