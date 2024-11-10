import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1731215361835 implements MigrationInterface {
  name = 'Init1731215361835';
  transaction = true;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(500) NOT NULL, \`expired_at\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`accessTokenId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_access_tokens\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(255) NOT NULL, \`expired_at\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`system_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`nick_name\` varchar(255) NULL, \`status\` int NOT NULL, \`shoppingCardId\` int NULL, UNIQUE INDEX \`IDX_741d321efeff6cfdf96dce44f8\` (\`email\`), UNIQUE INDEX \`REL_a7c102380cf5cfa54e588559fe\` (\`shoppingCardId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`shopping_card_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`subtitle\` varchar(255) NOT NULL, \`view\` int NOT NULL, \`amount\` int NOT NULL DEFAULT '8386', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`amount_product_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` int NOT NULL, \`productId\` int NULL, \`shoppingCardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`feedback_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`category_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`banner_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`image\` varchar(255) NOT NULL, \`isDisable\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`article_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`isDisable\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_refresh_tokens\` ADD CONSTRAINT \`FK_1dfd080c2abf42198691b60ae39\` FOREIGN KEY (\`accessTokenId\`) REFERENCES \`user_access_tokens\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_access_tokens\` ADD CONSTRAINT \`FK_e9d9d0c303432e4e5e48c1c3e90\` FOREIGN KEY (\`user_id\`) REFERENCES \`system_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_user\` ADD CONSTRAINT \`FK_a7c102380cf5cfa54e588559fe2\` FOREIGN KEY (\`shoppingCardId\`) REFERENCES \`shopping_card_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`amount_product_entity\` ADD CONSTRAINT \`FK_959bfe36e2a3b672814b70e89ea\` FOREIGN KEY (\`productId\`) REFERENCES \`product_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`amount_product_entity\` ADD CONSTRAINT \`FK_0d25473869fc8af9ae3870420ac\` FOREIGN KEY (\`shoppingCardId\`) REFERENCES \`shopping_card_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`amount_product_entity\` DROP FOREIGN KEY \`FK_0d25473869fc8af9ae3870420ac\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`amount_product_entity\` DROP FOREIGN KEY \`FK_959bfe36e2a3b672814b70e89ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`system_user\` DROP FOREIGN KEY \`FK_a7c102380cf5cfa54e588559fe2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_access_tokens\` DROP FOREIGN KEY \`FK_e9d9d0c303432e4e5e48c1c3e90\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_refresh_tokens\` DROP FOREIGN KEY \`FK_1dfd080c2abf42198691b60ae39\``,
    );
    await queryRunner.query(`DROP TABLE \`article_entity\``);
    await queryRunner.query(`DROP TABLE \`banner_entity\``);
    await queryRunner.query(`DROP TABLE \`category_entity\``);
    await queryRunner.query(`DROP TABLE \`feedback_entity\``);
    await queryRunner.query(`DROP TABLE \`notification_entity\``);
    await queryRunner.query(`DROP TABLE \`amount_product_entity\``);
    await queryRunner.query(`DROP TABLE \`product_entity\``);
    await queryRunner.query(`DROP TABLE \`shopping_card_entity\``);
    await queryRunner.query(
      `DROP INDEX \`REL_a7c102380cf5cfa54e588559fe\` ON \`system_user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_741d321efeff6cfdf96dce44f8\` ON \`system_user\``,
    );
    await queryRunner.query(`DROP TABLE \`system_user\``);
    await queryRunner.query(`DROP TABLE \`user_access_tokens\``);
    await queryRunner.query(`DROP TABLE \`user_refresh_tokens\``);
  }
}
