import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSaldoToClienteMigration1769710322162 implements MigrationInterface {
    name = 'AddSaldoToClienteMigration1769710322162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`saldo\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`saldo\``);
    }

}
