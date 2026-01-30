import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrationMigration1769732832317 implements MigrationInterface {
    name = 'InitialMigrationMigration1769732832317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`documento\` varchar(255) NOT NULL, \`nombres\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`celular\` varchar(15) NOT NULL, \`saldo\` double NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`version\` int NOT NULL, UNIQUE INDEX \`IDX_b103c6aa5bd04b31c206f79d3a\` (\`documento\`), UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`type\` varchar(70) NOT NULL, \`token\` varchar(255) NOT NULL, \`used\` tinyint NOT NULL DEFAULT 0, \`payload\` json NOT NULL, \`client_id\` int NOT NULL, \`expired_at\` datetime NOT NULL, \`completed_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`version\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tokens\` ADD CONSTRAINT \`FK_56572b5de2d1027923cd2c1aa00\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_56572b5de2d1027923cd2c1aa00\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``);
        await queryRunner.query(`DROP INDEX \`IDX_b103c6aa5bd04b31c206f79d3a\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
    }

}
