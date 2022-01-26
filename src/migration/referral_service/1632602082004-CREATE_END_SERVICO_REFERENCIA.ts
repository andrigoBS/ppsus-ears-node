import {MigrationInterface, QueryRunner} from "typeorm";

export class CREATEENDSERVICOREFERENCIA1632602082004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`end_servico_referencia\` (
              \`id_endereco_servico\` INT NOT NULL,
              \`estado\` VARCHAR(255) NULL,
              \`cidade\` VARCHAR(255) NULL,
              \`rua\` VARCHAR(255) NULL,
              \`numero\` INT NULL,
              \`complemento\` VARCHAR(255) NULL,
              \`CEP\` VARCHAR(45) NULL,
              \`data_desativado\` DATETIME NULL,
              \`id_servico\` INT UNSIGNED NOT NULL,
              PRIMARY KEY (\`id_endereco_servico\`),
              UNIQUE INDEX \`id_endereco_servico_UNIQUE\` (\`id_endereco_servico\` ASC) VISIBLE,
              INDEX \`fk_end_servico_referencia_servico_referencia1_idx\` (\`id_servico\` ASC) VISIBLE,
              CONSTRAINT \`fk_end_servico_referencia_servico_referencia1\`
                FOREIGN KEY (\`servico_referencia_id_servico\`)
                REFERENCES \`servico_referencia\` (\`id_servico\`)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('end_servico_referencia')
    }

}
