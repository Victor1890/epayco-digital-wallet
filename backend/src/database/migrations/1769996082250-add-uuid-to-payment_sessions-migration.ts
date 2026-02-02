import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuidToPaymentSessionsMigration1769996082250 implements MigrationInterface {
    name = 'AddUuidToPaymentSessionsMigration1769996082250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_sessions\` ADD \`uuid\` varchar(36) NULL`);
        await queryRunner.query(`UPDATE \`payment_sessions\` SET \`uuid\` = UUID() WHERE \`uuid\` IS NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_sessions\` MODIFY \`uuid\` varchar(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_sessions\` DROP COLUMN \`uuid\``);
    }
}
