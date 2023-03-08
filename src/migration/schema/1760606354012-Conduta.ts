import { MigrationInterface, QueryRunner } from 'typeorm';

export class Conduta1760606354012 implements MigrationInterface {
    name = 'Conduta1760606354012';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`conduta\` (
                \`id_conduct\` int NOT NULL AUTO_INCREMENT, 
                \`descricao_resultado\` TEXT NOT NULL COMMENT 'Descrição da conduta', 
                \`descricao_acompanhamento\` TEXT NOT NULL COMMENT 'Descrição do acompanhamento', 
                \`orelha_esquerda\` tinyint NOT NULL COMMENT 'Se a orelha esquerda passou no teste', 
                \`orelha_direita\` tinyint NOT NULL COMMENT 'Se a orelha direita passou no teste', 
                \`irda\` tinyint NOT NULL COMMENT 'Se o a conduta está relacionada com o irda', 
                \`tipo_triagem\` enum ('EOE transitente', 'EOE produto de distorção', 'PEATE automático', 'EOE transitente + PEATE automático') NOT NULL COMMENT 'Tipo de triagem', 
                \`tipo_teste\` int NOT NULL COMMENT 'Se é relacionado ao teste, reteste e teste e reteste', 
            PRIMARY KEY (\`id_conduct\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `conduta`');
    }
}
