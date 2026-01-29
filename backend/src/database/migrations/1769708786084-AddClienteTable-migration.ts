import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClienteTableMigration1769708786084 implements MigrationInterface {
    name = 'AddClienteTableMigration1769708786084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clientes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`documento\` varchar(255) NOT NULL, \`nombres\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`celular\` varchar(15) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fc002853c86bd15f82ef93bf42\` (\`documento\`), UNIQUE INDEX \`IDX_3cd5652ab34ca1a0a2c7a25531\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3cd5652ab34ca1a0a2c7a25531\` ON \`clientes\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc002853c86bd15f82ef93bf42\` ON \`clientes\``);
        await queryRunner.query(`DROP TABLE \`clientes\``);
    }

}
