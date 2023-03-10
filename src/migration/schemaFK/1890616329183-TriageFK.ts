import { MigrationInterface, QueryRunner } from 'typeorm';

export class FonoFK1960616329182 implements MigrationInterface {
    name = 'FonoFK1960616329182';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `triagem` ADD `fk_fonoaudiologo` int NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\'');
        await queryRunner.query('ALTER TABLE `triagem` ADD `fk_equipamento` int NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\'');
        await queryRunner.query('ALTER TABLE `triagem` ADD `fk_conduta` int NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\'');
        await queryRunner.query('ALTER TABLE `triagem` ADD `fk_orientacao` int NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\'');
        await queryRunner.query('ALTER TABLE `triagem` ADD `fk_instituicao` int NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\'');
        await queryRunner.query('ALTER TABLE `triagem` ADD `fk_bebe` int NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\'');

        await queryRunner.query('ALTER TABLE `triagem` ADD CONSTRAINT `FK_5f0de69a3f05aed9e0203c549c5` FOREIGN KEY (`fk_fonoaudiologo`) REFERENCES `fonoaudiologo`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `indicador_risco` ADD CONSTRAINT `FK_dd07799f3cdc394083869611341` FOREIGN KEY (`fk_fonoaudiologo`) REFERENCES `fonoaudiologo`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `indicador_risco` DROP FOREIGN KEY `FK_dd07799f3cdc394083869611341`');
        await queryRunner.query('ALTER TABLE `conduta` DROP FOREIGN KEY `FK_5f0de69a3f05aed9e0203c549c5`');

        await queryRunner.query('ALTER TABLE `indicador_risco` DROP COLUMN `fk_fonoaudiologo`');
        await queryRunner.query('ALTER TABLE `conduta` DROP COLUMN `fk_fonoaudiologo`');
    }

}
