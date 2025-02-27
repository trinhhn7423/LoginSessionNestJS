import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1740626316477 implements MigrationInterface {
    name = 'NewMigration1740626316477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Role\` (\`id\` tinyint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_b852abd9e268a63287bc815aab\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`managerId\` int NULL, \`email\` varchar(50) NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`status\` enum ('0', '1') NULL, \`something\` tinyint NOT NULL DEFAULT 0, \`role_id\` tinyint NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), UNIQUE INDEX \`IDX_1f5c894f79cd0159ff4e1a4450\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`totalExpenditure\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_attribute_value\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`attributeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_attribute\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(50) NOT NULL, \`sku_code\` varchar(255) NOT NULL, \`barcode\` varchar(255) NOT NULL, \`unit\` varchar(255) NOT NULL, \`branch\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`sell_price\` int NOT NULL, \`compare_price\` int NOT NULL, \`cost\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`quantity\` int NOT NULL, \`createById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`orderCode\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`discount\` int NOT NULL, \`deliveryCost\` int NOT NULL, \`payment\` enum ('0', '1') NOT NULL, \`orderStatus\` enum ('0', '1', '2') NOT NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD CONSTRAINT \`FK_775147058c769ea57efe923d288\` FOREIGN KEY (\`role_id\`) REFERENCES \`Role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_72a07a05e866d7f19ddb2457127\` FOREIGN KEY (\`attributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute\` ADD CONSTRAINT \`FK_c0d597555330c0a972122bf4673\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_15f846a6119e9ad524c8b22fb21\` FOREIGN KEY (\`createById\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_entity\` ADD CONSTRAINT \`FK_4480b7afbd07c9d3dfa5324862a\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer_entity\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_entity\` DROP FOREIGN KEY \`FK_4480b7afbd07c9d3dfa5324862a\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_15f846a6119e9ad524c8b22fb21\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute\` DROP FOREIGN KEY \`FK_c0d597555330c0a972122bf4673\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_72a07a05e866d7f19ddb2457127\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP FOREIGN KEY \`FK_775147058c769ea57efe923d288\``);
        await queryRunner.query(`DROP TABLE \`order_entity\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`product_attribute\``);
        await queryRunner.query(`DROP TABLE \`product_attribute_value\``);
        await queryRunner.query(`DROP TABLE \`customer_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f5c894f79cd0159ff4e1a4450\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_b852abd9e268a63287bc815aab\` ON \`Role\``);
        await queryRunner.query(`DROP TABLE \`Role\``);
    }

}
