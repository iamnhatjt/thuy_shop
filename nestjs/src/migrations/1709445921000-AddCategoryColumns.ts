import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryColumns1709445921000 implements MigrationInterface {
  name = 'AddCategoryColumns1709445921000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add new columns to category_entity (idempotent — skip if already exists)
    const categoryColumns = await queryRunner.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_entity'`,
    );
    const existingCols = categoryColumns.map((c: any) => c.COLUMN_NAME);

    if (!existingCols.includes('title')) {
      await queryRunner.query(
        `ALTER TABLE \`category_entity\` ADD \`title\` varchar(255) NOT NULL`,
      );
    }
    if (!existingCols.includes('url')) {
      await queryRunner.query(
        `ALTER TABLE \`category_entity\` ADD \`url\` varchar(255) NOT NULL`,
      );
    }
    if (!existingCols.includes('is_active')) {
      await queryRunner.query(
        `ALTER TABLE \`category_entity\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
      );
    }
    if (!existingCols.includes('parent_id')) {
      await queryRunner.query(
        `ALTER TABLE \`category_entity\` ADD \`parent_id\` int NULL`,
      );
    }

    // Add description column to product_entity if missing
    const productColumns = await queryRunner.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_entity'`,
    );
    const existingProductCols = productColumns.map((c: any) => c.COLUMN_NAME);
    if (!existingProductCols.includes('description')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`description\` longtext NOT NULL`,
      );
    }

    // Self-referencing FK for parent/child hierarchy (check if exists)
    const categoryFKs = await queryRunner.query(
      `SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_entity' AND CONSTRAINT_TYPE = 'FOREIGN KEY'`,
    );
    const existingFKs = categoryFKs.map((fk: any) => fk.CONSTRAINT_NAME);
    if (!existingFKs.includes('FK_category_parent')) {
      await queryRunner.query(
        `ALTER TABLE \`category_entity\` ADD CONSTRAINT \`FK_category_parent\` FOREIGN KEY (\`parent_id\`) REFERENCES \`category_entity\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
      );
    }

    // Many-to-many join table: category_products
    const tables = await queryRunner.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_products'`,
    );
    if (tables.length === 0) {
      await queryRunner.query(
        `CREATE TABLE \`category_products\` (\`category_id\` int NOT NULL, \`product_id\` int NOT NULL, INDEX \`IDX_category_products_category\` (\`category_id\`), INDEX \`IDX_category_products_product\` (\`product_id\`), PRIMARY KEY (\`category_id\`, \`product_id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `ALTER TABLE \`category_products\` ADD CONSTRAINT \`FK_category_products_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`category_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
      );
      await queryRunner.query(
        `ALTER TABLE \`category_products\` ADD CONSTRAINT \`FK_category_products_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`product_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop join table FKs and table
    await queryRunner.query(
      `ALTER TABLE \`category_products\` DROP FOREIGN KEY \`FK_category_products_product\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_products\` DROP FOREIGN KEY \`FK_category_products_category\``,
    );
    await queryRunner.query(`DROP TABLE \`category_products\``);

    // Drop self-referencing FK
    await queryRunner.query(
      `ALTER TABLE \`category_entity\` DROP FOREIGN KEY \`FK_category_parent\``,
    );

    // Drop added columns
    await queryRunner.query(
      `ALTER TABLE \`category_entity\` DROP COLUMN \`parent_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_entity\` DROP COLUMN \`is_active\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_entity\` DROP COLUMN \`url\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_entity\` DROP COLUMN \`title\``,
    );
  }
}
