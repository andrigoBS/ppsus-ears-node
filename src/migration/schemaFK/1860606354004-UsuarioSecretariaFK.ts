import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsuarioSecretariaFK1860606354004 implements MigrationInterface {
    name = 'UsuarioSecretariaFK1860606354004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario_secretaria\`
            ADD CONSTRAINT \`FK_eda65607580b1c279c6cd43f7b4\`
            FOREIGN KEY (\`fk_secretaria_estado\`) REFERENCES \`estado\`(\`id_estado\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE \`usuario_secretaria\`
            ADD CONSTRAINT \`FK_52b786b3619332df99cb60cf8ef\`
            FOREIGN KEY (\`fk_secretaria_regiao\`) REFERENCES \`regiao\`(\`id_regiao\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `usuario_secretaria` DROP FOREIGN KEY `FK_52b786b3619332df99cb60cf8ef`');
        await queryRunner.query('ALTER TABLE `usuario_secretaria` DROP FOREIGN KEY `FK_eda65607580b1c279c6cd43f7b4`');
        await queryRunner.query('DROP INDEX `IDX_598ea50144fd99f2795c01c877` ON `usuario_secretaria`');
    }
}
