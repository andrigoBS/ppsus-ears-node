import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServicoReferencia1760606354025 implements MigrationInterface {
    name = 'ServicoReferencia1760606354025';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`servico_referencia\` (
                \`id_servico\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primária do servico de referencia',
                \`nome_servico\` varchar(255) NOT NULL COMMENT 'Nome do Serviço',
                \`cnpj\` varchar(13) NULL COMMENT 'CNPJ do servico de referencia',
                \`cnes\` varchar(7) NULL,
                \`tipo_servico\` enum ('Serviço do Sistema Único de Saúde(SUS)', 'Serviço Privado', 'Serviço Misto') NOT NULL COMMENT 'Tipo de Serviço',
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do serviço de referencia' DEFAULT CURRENT_TIMESTAMP(6),
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o serviço de referencia foi inativado nessa data',
                \`fk_municipio\` int NOT NULL,
                \`rua\` varchar(255) NOT NULL COMMENT 'Rua em que se encontra esse endereço',
                \`numero\` int NOT NULL COMMENT 'Numero do estabelecimento',
                \`complemento\` varchar(255) NULL COMMENT 'Complemento para o endereço',
                \`CEP\` varchar(8) NOT NULL COMMENT 'CEP do endereço', 
            PRIMARY KEY (\`id_servico\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `servico_referencia`');
    }
}
