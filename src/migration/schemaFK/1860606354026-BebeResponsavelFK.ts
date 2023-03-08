import { MigrationInterface, QueryRunner } from 'typeorm';

export class BebeResponsavelFK1860606354026 implements MigrationInterface {
    name = 'BebeResponsavelFK1860606354026';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bebe_responsavel\`
            ADD CONSTRAINT \`FK_7a4e62e4f8e13c282c3e2c9c37c\`
            FOREIGN KEY (\`fk_bebe\`) REFERENCES \`bebe\`(\`id_bebe\`)
            ON DELETE CASCADE ON UPDATE CASCADE`);

        await queryRunner.query(`ALTER TABLE \`bebe_responsavel\`
            ADD CONSTRAINT \`FK_9e1792f437507f6e3e44a2c1428\`
            FOREIGN KEY (\`fk_responsavel\`) REFERENCES \`responsavel\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `bebe_responsavel` DROP FOREIGN KEY `FK_9e1792f437507f6e3e44a2c1428`');
        await queryRunner.query('ALTER TABLE `bebe_responsavel` DROP FOREIGN KEY `FK_7a4e62e4f8e13c282c3e2c9c37c`');
        await queryRunner.query('DROP INDEX `IDX_9e1792f437507f6e3e44a2c142` ON `bebe_responsavel`');
        await queryRunner.query('DROP INDEX `IDX_7a4e62e4f8e13c282c3e2c9c37` ON `bebe_responsavel`');
    }
}
