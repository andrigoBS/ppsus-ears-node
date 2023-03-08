import { MigrationInterface, QueryRunner } from 'typeorm';

export class Instituicao1760606354022 implements MigrationInterface {
    name = 'Instituicao1760606354022';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`instituicao\` (
                \`id_instituicao\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primária da instituição',
                \`nome_instituicao\` varchar(255) NOT NULL COMMENT 'Nome instituição',
                \`cnes\` varchar(11) NOT NULL COMMENT 'CNES',
                \`cnpj\` varchar(14) NULL COMMENT 'CNPJ',
                \`tipo_instituicao\` enum ('Hospital', 'Maternidade', 'Hospital e Maternidade') NOT NULL COMMENT 'Tipo de Instituição',
                \`fk_municipio\` int NOT NULL,
                \`rua\` varchar(255) NOT NULL COMMENT 'Rua em que se encontra esse endereço',
                \`numero\` int NOT NULL COMMENT 'Numero do estabelecimento',
                \`complemento\` varchar(255) NULL COMMENT 'Complemento para o endereço',
                \`CEP\` varchar(8) NOT NULL COMMENT 'CEP do endereço', 
            PRIMARY KEY (\`id_instituicao\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `instituicao`');
    }
}
