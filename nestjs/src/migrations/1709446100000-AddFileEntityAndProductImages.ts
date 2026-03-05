import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFileEntityAndProductImages1709446100000
  implements MigrationInterface
{
  name = 'AddFileEntityAndProductImages1709446100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create file_entity table if not exists
    const fileTableExists = await queryRunner.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'file_entity'`,
    );
    if (fileTableExists.length === 0) {
      await queryRunner.query(`
        CREATE TABLE \`file_entity\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          \`url\` varchar(255) NOT NULL,
          \`original_name\` varchar(255) NOT NULL,
          \`mimetype\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB
      `);
    }

    // Create product_images join table if not exists
    const joinTableExists = await queryRunner.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_images'`,
    );
    if (joinTableExists.length === 0) {
      await queryRunner.query(`
        CREATE TABLE \`product_images\` (
          \`product_id\` int NOT NULL,
          \`file_id\` int NOT NULL,
          PRIMARY KEY (\`product_id\`, \`file_id\`),
          INDEX \`IDX_product_images_product\` (\`product_id\`),
          INDEX \`IDX_product_images_file\` (\`file_id\`),
          CONSTRAINT \`FK_product_images_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`product_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT \`FK_product_images_file\` FOREIGN KEY (\`file_id\`) REFERENCES \`file_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB
      `);
    }

    // Drop old product_image_entity table if exists (replaced by file_entity)
    const oldImageTableExists = await queryRunner.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_image_entity'`,
    );
    if (oldImageTableExists.length > 0) {
      await queryRunner.query(`DROP TABLE \`product_image_entity\``);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-create old product_image_entity table
    const oldImageTableExists = await queryRunner.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_image_entity'`,
    );
    if (oldImageTableExists.length === 0) {
      await queryRunner.query(`
        CREATE TABLE \`product_image_entity\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          \`url\` varchar(255) NOT NULL,
          \`productId\` int NULL,
          PRIMARY KEY (\`id\`),
          CONSTRAINT \`FK_product_image_product\` FOREIGN KEY (\`productId\`) REFERENCES \`product_entity\`(\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB
      `);
    }

    // Drop product_images join table
    const joinTableExists = await queryRunner.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_images'`,
    );
    if (joinTableExists.length > 0) {
      await queryRunner.query(`DROP TABLE \`product_images\``);
    }

    // Drop file_entity table
    const fileTableExists = await queryRunner.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'file_entity'`,
    );
    if (fileTableExists.length > 0) {
      await queryRunner.query(`DROP TABLE \`file_entity\``);
    }
  }
}
