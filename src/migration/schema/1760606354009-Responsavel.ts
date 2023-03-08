import { MigrationInterface, QueryRunner } from 'typeorm';

export class Responsavel1760606354009 implements MigrationInterface {
    name = 'Responsavel1760606354009';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`responsavel\` (
                \`id_usuario\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primária de um usuário. é única apenas dentro de uma tabela.', 
                \`login\` varchar(255) NOT NULL COMMENT 'Login do usuário, definido pelo user, exceto pais que é gerado pelo sistema', 
                \`password\` varchar(255) NOT NULL COMMENT 'password do usuário', 
                \`nome_usuario\` varchar(255) NOT NULL COMMENT 'Nome do usuário', 
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do usuário' DEFAULT CURRENT_TIMESTAMP(6), 
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data', 
                \`data_nascimento\` date NOT NULL COMMENT 'Data de nascimento do responsável (para cálculo de idade e afins)', 
                \`cpf\` varchar(11) NULL COMMENT 'CPF do responsável',
                \`fk_municipio\` int NOT NULL, 
                \`rua\` varchar(255) NOT NULL COMMENT 'Rua em que se encontra esse endereço', 
                \`numero\` int NOT NULL COMMENT 'Numero do estabelecimento', 
                \`complemento\` varchar(255) NULL COMMENT 'Complemento para o endereço', 
                \`CEP\` varchar(8) NOT NULL COMMENT 'CEP do endereço', 
            UNIQUE INDEX \`IDX_221edfd9792f27aac69cda983a\` (\`login\`), 
            UNIQUE INDEX \`IDX_eb83e23f5d564d476d25858172\` (\`cpf\`), 
            PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `responsavel`');
    }
}
