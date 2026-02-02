import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBalanceFieldMigration1769993101757 implements MigrationInterface {
    name = 'FixBalanceFieldMigration1769993101757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wallets\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`wallets\` ADD \`balance\` double NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wallets\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`wallets\` ADD \`balance\` decimal(14,2) NOT NULL DEFAULT '0.00'`);
    }

}
