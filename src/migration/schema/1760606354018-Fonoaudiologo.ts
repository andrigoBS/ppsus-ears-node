import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fonoaudiologo1760606354018 implements MigrationInterface {
    name = 'Fonoaudiologo1760606354018';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fonoaudiologo\` (
                \`id_usuario\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primária de um usuário. é única apenas dentro de uma tabela.', 
                \`login\` varchar(255) NOT NULL COMMENT 'Login do usuário, definido pelo user, exceto pais que é gerado pelo sistema', 
                \`password\` varchar(255) NOT NULL COMMENT 'password do usuário', 
                \`nome_usuario\` varchar(255) NOT NULL COMMENT 'Nome do usuário', 
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do usuário' DEFAULT CURRENT_TIMESTAMP(6), 
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data', 
                \`crfa\` varchar(8) NOT NULL COMMENT 'crfa',
                \`tempo_experiencia\` enum ('Menos de 1 ano', 'De 1 a 3 anos', 'De 3 a 5 anos', 'Mais de 5 anos') NOT NULL COMMENT 'enum do tempo de experiência',
            UNIQUE INDEX \`IDX_b9d94faecf55e50dd0b4006756\` (\`login\`), 
            PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX `IDX_b9d94faecf55e50dd0b4006756` ON `fonoaudiologo`');
        await queryRunner.query('DROP TABLE `fonoaudiologo`');
    }
}
