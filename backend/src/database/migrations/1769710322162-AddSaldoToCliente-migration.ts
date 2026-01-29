import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSaldoToClienteMigration1769710322162 implements MigrationInterface {
    name = 'AddSaldoToClienteMigration1769710322162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`saldo\` double NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`saldo\``);
    }

}
