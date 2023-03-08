import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelSecretariaFK1860606354001 implements MigrationInterface {
    name = 'TelSecretariaFK1860606354001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tel_secretaria\` 
            ADD CONSTRAINT \`FK_b4e4c0123728ef13ad060cbf1a3\` FOREIGN KEY (\`fk_secretaria\`) 
            REFERENCES \`usuario_secretaria\`(\`id_usuario\`) 
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `tel_secretaria` DROP FOREIGN KEY `FK_b4e4c0123728ef13ad060cbf1a3`');
    }
}
