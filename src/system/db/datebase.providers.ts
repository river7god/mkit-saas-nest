import { DataSource } from 'typeorm';
import 'dotenv/config';
import "reflect-metadata";

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.TYPEORM_MYSQL_HOST,
        port: +process.env.TYPEORM_MYSQL_PORT,
        username: process.env.TYPEORM_MYSQL_USERNAME,
        password: process.env.TYPEORM_MYSQL_PASSWORD,
        database: process.env.TYPEORM_MYSQL_DATABASE,
        entities: [__dirname + '/../../**/**/**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
