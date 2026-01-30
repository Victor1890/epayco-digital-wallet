import { MigrationInterface, QueryRunner } from "typeorm";

export class BalanceAddDefaultValueMigration1769735942954 implements MigrationInterface {
    name = 'BalanceAddDefaultValueMigration1769735942954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`saldo\` \`saldo\` double NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`saldo\` \`saldo\` double NOT NULL`);
    }

}
