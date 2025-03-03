import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1740904672504 implements MigrationInterface {
    name = 'NewMigration1740904672504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` tinyint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`managerId\` int NULL, \`email\` varchar(50) NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`status\` enum ('0', '1') NULL, \`something\` tinyint NOT NULL DEFAULT 0, \`role_id\` tinyint NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`totalExpenditure\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`size\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`material\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_variant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`skuCode\` varchar(255) NOT NULL, \`barCode\` varchar(255) NOT NULL, \`unit\` varchar(255) NOT NULL, \`sellPrice\` int NOT NULL, \`comparePrice\` int NOT NULL, \`cost\` int NOT NULL, \`quantity\` int NOT NULL, \`image\` varchar(255) NULL, \`productId\` int NULL, \`colorId\` int NULL, \`sizeId\` int NULL, \`materialId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`color\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(50) NOT NULL, \`skuCode\` varchar(255) NOT NULL, \`barCode\` varchar(255) NOT NULL, \`unit\` varchar(255) NOT NULL, \`branch\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`sellPrice\` int NOT NULL, \`comparePrice\` int NOT NULL, \`cost\` int NOT NULL, \`image\` varchar(255) NULL, \`quantity\` int NULL, \`createById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NOT NULL DEFAULT 0, \`orderCode\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`discount\` int NOT NULL, \`deliveryCost\` int NOT NULL, \`payment\` enum ('0', '1') NOT NULL, \`orderStatus\` enum ('0', '1', '2') NOT NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_fb2e442d14add3cefbdf33c4561\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`size\` ADD CONSTRAINT \`FK_64bfb35ee164937540622ea7c9e\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`material\` ADD CONSTRAINT \`FK_41055e7aa7ed513ab11df9a15b0\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_6e420052844edf3a5506d863ce6\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_646f2685fe07002ddfff1c5cb87\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_83181384731b20fa47ac6b2accb\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_82ea01819b216227037f4db68e0\` FOREIGN KEY (\`materialId\`) REFERENCES \`material\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD CONSTRAINT \`FK_11620774493e842bd7167f74c10\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_15f846a6119e9ad524c8b22fb21\` FOREIGN KEY (\`createById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_15f846a6119e9ad524c8b22fb21\``);
        await queryRunner.query(`ALTER TABLE \`color\` DROP FOREIGN KEY \`FK_11620774493e842bd7167f74c10\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_82ea01819b216227037f4db68e0\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_83181384731b20fa47ac6b2accb\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_646f2685fe07002ddfff1c5cb87\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_6e420052844edf3a5506d863ce6\``);
        await queryRunner.query(`ALTER TABLE \`material\` DROP FOREIGN KEY \`FK_41055e7aa7ed513ab11df9a15b0\``);
        await queryRunner.query(`ALTER TABLE \`size\` DROP FOREIGN KEY \`FK_64bfb35ee164937540622ea7c9e\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_fb2e442d14add3cefbdf33c4561\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`color\``);
        await queryRunner.query(`DROP TABLE \`product_variant\``);
        await queryRunner.query(`DROP TABLE \`material\``);
        await queryRunner.query(`DROP TABLE \`size\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
