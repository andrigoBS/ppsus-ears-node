import { MigrationInterface, QueryRunner } from 'typeorm';

export class Orientacao1760606354017 implements MigrationInterface {
    name = 'Orientacao1760606354017';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orientacao\` (
                \`id_orientation\` int NOT NULL AUTO_INCREMENT, 
                \`descricao\` varchar(255) NOT NULL COMMENT 'Descreve a orientação', 
                \`data_desativacao\` date COMMENT 'Data de desativação do equipamento',
                \`fk_fonoaudiologo\` int NULL COMMENT 'Chave primária de um usuário. é única apenas dentro de uma tabela.', 
            PRIMARY KEY (\`id_orientation\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `orientacao`');
    }
}
