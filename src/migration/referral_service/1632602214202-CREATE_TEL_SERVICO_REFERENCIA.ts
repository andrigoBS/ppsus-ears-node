import {MigrationInterface, QueryRunner} from "typeorm";

export class CREATETELSERVICOREFERENCIA1632602214202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`tel_servico_referencia\` (
              \`id_tel_servico\` INT NOT NULL,
              \`numero\` VARCHAR(45) NULL,
              \`nome_contato\` VARCHAR(45) NULL,
              \`whatsapp\` TINYINT NULL,
              \`data_desativado\` DATETIME NULL,
              \`id_servico\` INT UNSIGNED NOT NULL,
              PRIMARY KEY (\`id_tel_servico\`),
              UNIQUE INDEX \`id_tel_servico_UNIQUE\` (\`id_tel_servico\` ASC) VISIBLE,
              INDEX \`fk_tel_servico_referencia_servico_referencia1_idx\` (\`id_servico\` ASC) VISIBLE,
              CONSTRAINT \`fk_tel_servico_referencia_servico_referencia1\`
                FOREIGN KEY (\`servico_referencia_id_servico\`)
                REFERENCES \`servico_referencia\` (\`id_servico\`)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tel_servico_referencia')
    }

}
