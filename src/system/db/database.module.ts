import { Module } from '@nestjs/common';
import { databaseProviders } from './datebase.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
