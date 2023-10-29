import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://postgres:postgres@db:5432/saga-sales?schema=public',
  migrations: [`${__dirname}/migration/**/*.ts`],
});
