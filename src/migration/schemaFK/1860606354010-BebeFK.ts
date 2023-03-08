import { MigrationInterface, QueryRunner } from 'typeorm';

export class BebeFK1860606354010 implements MigrationInterface {
    name = 'BebeFK1860606354010';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bebe\`
            ADD CONSTRAINT \`FK_05c2dbd5574e98c267b3b80645c\`
            FOREIGN KEY (\`fk_mae_bio\`) REFERENCES \`responsavel\`(\`id_usuario\`)
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `bebe` DROP FOREIGN KEY `FK_05c2dbd5574e98c267b3b80645c`');
        await queryRunner.query('DROP INDEX `REL_05c2dbd5574e98c267b3b80645` ON `bebe`');
    }
}
