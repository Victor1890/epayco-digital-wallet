import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigrationsMigration1769990788991 implements MigrationInterface {
    name = 'InitMigrationsMigration1769990788991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment_sessions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`otp\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`confirmed\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(14,2) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`wallet_id\` int NULL, \`customer_id\` int NULL, \`session_id\` int NULL, UNIQUE INDEX \`REL_b61ceb7c34c6de400d731bbdb4\` (\`session_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`documento\` varchar(255) NOT NULL, \`nombres\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`celular\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_f96925c16b562008c7dd496e9a\` (\`celular\`), UNIQUE INDEX \`IDX_8536b8b85c06969f84f0c098b0\` (\`email\`), UNIQUE INDEX \`IDX_9beb99fbf2858605e4c04af62f\` (\`documento\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wallets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`balance\` decimal(14,2) NOT NULL DEFAULT '0.00', \`customer_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`topups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(14,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, \`wallet_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_1bdffa25425538e630d8eb8a8bc\` FOREIGN KEY (\`wallet_id\`) REFERENCES \`wallets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_d0b02233df1c52323107fe7b4d7\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_b61ceb7c34c6de400d731bbdb41\` FOREIGN KEY (\`session_id\`) REFERENCES \`payment_sessions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wallets\` ADD CONSTRAINT \`FK_6580899a2293de27787376887fa\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`topups\` ADD CONSTRAINT \`FK_e36933498bfc3a61e7bcd06c668\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`topups\` ADD CONSTRAINT \`FK_57e37f4ca655dcde7d6b9fb7e65\` FOREIGN KEY (\`wallet_id\`) REFERENCES \`wallets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`topups\` DROP FOREIGN KEY \`FK_57e37f4ca655dcde7d6b9fb7e65\``);
        await queryRunner.query(`ALTER TABLE \`topups\` DROP FOREIGN KEY \`FK_e36933498bfc3a61e7bcd06c668\``);
        await queryRunner.query(`ALTER TABLE \`wallets\` DROP FOREIGN KEY \`FK_6580899a2293de27787376887fa\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_b61ceb7c34c6de400d731bbdb41\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_d0b02233df1c52323107fe7b4d7\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_1bdffa25425538e630d8eb8a8bc\``);
        await queryRunner.query(`DROP TABLE \`topups\``);
        await queryRunner.query(`DROP TABLE \`wallets\``);
        await queryRunner.query(`DROP INDEX \`IDX_9beb99fbf2858605e4c04af62f\` ON \`customers\``);
        await queryRunner.query(`DROP INDEX \`IDX_8536b8b85c06969f84f0c098b0\` ON \`customers\``);
        await queryRunner.query(`DROP INDEX \`IDX_f96925c16b562008c7dd496e9a\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP INDEX \`REL_b61ceb7c34c6de400d731bbdb4\` ON \`payments\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP TABLE \`payment_sessions\``);
    }

}
