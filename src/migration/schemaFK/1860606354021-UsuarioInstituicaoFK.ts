import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsuarioInstituicaoFK1860606354021 implements MigrationInterface {
    name = 'UsuarioInstituicaoFK1860606354021';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario_instituicao\`
            ADD CONSTRAINT \`FK_95a9899ccce8f07dff2f523873e\`
            FOREIGN KEY (\`fk_instituicao\`) REFERENCES \`instituicao\`(\`id_instituicao\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `usuario_instituicao` DROP FOREIGN KEY `FK_95a9899ccce8f07dff2f523873e`');
        await queryRunner.query('DROP INDEX `IDX_ed675152693ba21f7728bf4cb8` ON `usuario_instituicao`');
    }
}
