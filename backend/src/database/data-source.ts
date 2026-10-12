import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'better-sqlite3',
  database: process.env.SQLITE_PATH ?? 'database.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
};

export default new DataSource(dataSourceOptions);
