import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1588973633521 implements MigrationInterface {
    name = 'initialize1588973633521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `ratings` (`id` varchar(36) NOT NULL, `comment` text NOT NULL, `type` varchar(255) NOT NULL, `value` smallint NOT NULL, INDEX `IDX_6ab786593733ed47a6893e4143` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_6ab786593733ed47a6893e4143` ON `ratings`", undefined);
        await queryRunner.query("DROP TABLE `ratings`", undefined);
    }

}
