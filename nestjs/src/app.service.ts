import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      await this.runMigrations();
    } catch (err) {
      console.error('Error running migrations:', err);
      throw err;
    }
  }

  private async runMigrations() {
    const hasPendingMigrations = await this.dataSource.showMigrations();
    console.log('Has pending migrations:', hasPendingMigrations);

    const isExist = await this.dataSource.query(
      `SELECT * FROM migrations WHERE name = 'Init1731215361835'`,
    );
    // if (isExist.length == 0) {
    //   await this.dataSource.query('BEGIN');
    //   await this.dataSource.query(
    //     `INSERT INTO migrations(timestamp, name) VALUES (1731215361835,'Init1731215361835')`,
    //   );
    //   await this.dataSource.query('COMMIT');
    // }

    const hasPendingMigrations2 = await this.dataSource.showMigrations();
    console.log('Has pending migrations2:', hasPendingMigrations2);

    const migrations = await this.dataSource.runMigrations();
    if (migrations.length > 0) {
      console.log('Migrations run:', migrations.map((m) => m.name).join(', '));
    } else {
      console.log('No migrations to run');
    }
  }
}
