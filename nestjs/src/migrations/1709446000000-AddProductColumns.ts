import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductColumns1709446000000 implements MigrationInterface {
  name = 'AddProductColumns1709446000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const columns = await queryRunner.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_entity'`,
    );
    const existingCols = columns.map((c: any) => c.COLUMN_NAME);

    if (!existingCols.includes('price')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`price\` decimal(10,2) NOT NULL DEFAULT 0`,
      );
    }
    if (!existingCols.includes('original_price')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`original_price\` decimal(10,2) NULL`,
      );
    }
    if (!existingCols.includes('badge')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`badge\` varchar(255) NULL`,
      );
    }
    if (!existingCols.includes('material')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`material\` varchar(255) NULL`,
      );
    }
    if (!existingCols.includes('height')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`height\` varchar(255) NULL`,
      );
    }
    if (!existingCols.includes('origin')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`origin\` varchar(255) NULL`,
      );
    }
    if (!existingCols.includes('firmness')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`firmness\` varchar(255) NULL`,
      );
    }
    if (!existingCols.includes('certifications')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`certifications\` varchar(255) NULL`,
      );
    }
    if (!existingCols.includes('warranty')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`warranty\` varchar(255) NULL`,
      );
    }
    if (!existingCols.includes('is_active')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
      );
    }

    // Drop subtitle column if it exists
    if (existingCols.includes('subtitle')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` DROP COLUMN \`subtitle\``,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const columns = await queryRunner.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_entity'`,
    );
    const existingCols = columns.map((c: any) => c.COLUMN_NAME);

    // Re-add subtitle
    if (!existingCols.includes('subtitle')) {
      await queryRunner.query(
        `ALTER TABLE \`product_entity\` ADD \`subtitle\` varchar(255) NOT NULL DEFAULT ''`,
      );
    }

    // Drop new columns
    const colsToDrop = [
      'is_active',
      'warranty',
      'certifications',
      'firmness',
      'origin',
      'height',
      'material',
      'badge',
      'original_price',
      'price',
    ];
    for (const col of colsToDrop) {
      if (existingCols.includes(col)) {
        await queryRunner.query(
          `ALTER TABLE \`product_entity\` DROP COLUMN \`${col}\``,
        );
      }
    }
  }
}
