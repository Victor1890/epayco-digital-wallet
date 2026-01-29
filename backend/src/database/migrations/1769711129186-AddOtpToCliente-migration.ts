import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOtpToClienteMigration1769711129186 implements MigrationInterface {
    name = 'AddOtpToClienteMigration1769711129186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`otp\` varchar(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`otpExpiration\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`otpExpiration\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`otp\``);
    }

}
