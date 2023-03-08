import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailSecretariaFK1860606354002 implements MigrationInterface {
    name = 'EmailSecretariaFK1860606354002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_secretaria\`
            ADD CONSTRAINT \`FK_7fce7ce9ab351d900273f01dae5\`
            FOREIGN KEY (\`fk_usuario\`) REFERENCES \`usuario_secretaria\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `email_secretaria` DROP FOREIGN KEY `FK_7fce7ce9ab351d900273f01dae5`');
        await queryRunner.query('DROP INDEX `IDX_7be91b49157d8838ca8a0bd0ac` ON `email_secretaria`');
    }
}
