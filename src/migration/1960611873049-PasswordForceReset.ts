import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordForceReset1960611873049 implements MigrationInterface {
    name = 'PasswordForceReset1960611873049';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `usuario_secretaria` ADD `resetar_senha` tinyint NOT NULL COMMENT \'Força a mudança de senha no próximo login\' DEFAULT 1');
        await queryRunner.query('ALTER TABLE `responsavel` ADD `resetar_senha` tinyint NOT NULL COMMENT \'Força a mudança de senha no próximo login\' DEFAULT 1');
        await queryRunner.query('ALTER TABLE `fonoaudiologo` ADD `resetar_senha` tinyint NOT NULL COMMENT \'Força a mudança de senha no próximo login\' DEFAULT 0');
        await queryRunner.query('ALTER TABLE `usuario_instituicao` ADD `resetar_senha` tinyint NOT NULL COMMENT \'Força a mudança de senha no próximo login\' DEFAULT 0');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `usuario_instituicao` DROP COLUMN `resetar_senha`');
        await queryRunner.query('ALTER TABLE `fonoaudiologo` DROP COLUMN `resetar_senha`');
        await queryRunner.query('ALTER TABLE `responsavel` DROP COLUMN `resetar_senha`');
        await queryRunner.query('ALTER TABLE `usuario_secretaria` DROP COLUMN `resetar_senha`');
    }

}
