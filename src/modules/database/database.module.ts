import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
