import os from 'os';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

process.loadEnvFile();

let seedsPath = path.join(__dirname, '/seeding/seeds/*.{ts,js}');

if (os.platform() === 'win32') {
    seedsPath = seedsPath.replace(/\\/g, '/');
}

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    url: process.env.MYSQL_DB_URI,
    synchronize: false,
    migrationsRun: false,
    migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
    seeds: [seedsPath],
};

export default new DataSource(dataSourceOptions);
