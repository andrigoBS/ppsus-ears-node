import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResponsavelFK1860606354009 implements MigrationInterface {
    name = 'ResponsavelFK1860606354009';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`responsavel\`
            ADD CONSTRAINT \`FK_f4bc3143258b4fb476c8d29dc77\`
            FOREIGN KEY (\`fk_municipio\`) REFERENCES \`municipio\`(\`id_municipio\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `responsavel` DROP FOREIGN KEY `FK_f4bc3143258b4fb476c8d29dc77`');
        await queryRunner.query('DROP INDEX `IDX_eb83e23f5d564d476d25858172` ON `responsavel`');
        await queryRunner.query('DROP INDEX `IDX_221edfd9792f27aac69cda983a` ON `responsavel`');
    }
}
