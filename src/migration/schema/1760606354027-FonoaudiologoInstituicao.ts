import { MigrationInterface, QueryRunner } from 'typeorm';

export class FonoaudiologoInstituicao1760606354027 implements MigrationInterface {
    name = 'FonoaudiologoInstituicao1760606354027';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fonoaudiologo_instituicao\` (
                \`fk_fonoaudiologo\` int NOT NULL,
                \`fk_instituicao\` int NOT NULL, 
            INDEX \`IDX_7077e424ccbe231dc2e49024f0\` (\`fk_fonoaudiologo\`), 
            INDEX \`IDX_f01631078e213c0238f9aeb506\` (\`fk_instituicao\`), 
            PRIMARY KEY (\`fk_fonoaudiologo\`, \`fk_instituicao\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `fonoaudiologo_instituicao`');
    }
}
