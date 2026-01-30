import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuidClientTableMigration1769735858198 implements MigrationInterface {
    name = 'AddUuidClientTableMigration1769735858198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`uuid\` varchar(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`uuid\``);
    }

}
