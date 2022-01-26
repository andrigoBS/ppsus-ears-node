import {MigrationInterface, QueryRunner} from "typeorm";

export class CREATEEMAILSERVICOREFERENCIA1632601676692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`email_servico_referencia\` (
              \`id_email\` INT NOT NULL,
              \`email\` VARCHAR(255) NULL,
              \`nome_contato\` VARCHAR(45) NULL,
              \`data_desativado\` DATETIME NULL,
              \`id_servico\` INT UNSIGNED NOT NULL,
              PRIMARY KEY (\`id_email\`),
              UNIQUE INDEX \`id_email_UNIQUE\` (\`id_email\` ASC) VISIBLE,
              INDEX \`fk_email_servico_referencia_servico_referencia_idx\` (\`id_servico\` ASC) VISIBLE,
              CONSTRAINT \`fk_email_servico_referencia_servico_referencia\`
                FOREIGN KEY (\`servico_referencia_id_servico\`)
                REFERENCES \`servico_referencia\` (\`id_servico\`)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('email_servico_referencia')
    }

}
