import {MigrationInterface, QueryRunner} from "typeorm";

export class CREATESERVICOREFERENCIA1632600467769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`servico_referencia\` (
              \`id_servico\` INT UNSIGNED NOT NULL,
              \`nome_fantasia\` VARCHAR(255) NOT NULL,
              \`razao_social\` VARCHAR(255) NOT NULL,
              \`cnpj\` VARCHAR(13) NULL,
              \`isSus\` TINYINT NOT NULL,
              \`data_desativado\` DATETIME NULL,
              PRIMARY KEY (\`id_servico\`))
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('referral_service');
    }

}
