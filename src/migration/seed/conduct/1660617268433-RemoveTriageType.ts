import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveTriageType1660617268433 implements MigrationInterface {
    name = 'RemoveTriageType1660617268433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('conduta', 'tipo_triagem');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE conduta ADD \`tipo_triagem\` enum ('EOE transitente', 'EOE produto de distorção', 'PEATE automático', 'EOE transitente + PEATE automático') NOT NULL COMMENT 'Tipo de triagem'`);
    }

}
