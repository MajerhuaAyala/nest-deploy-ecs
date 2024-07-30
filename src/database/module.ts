import { Module } from '@nestjs/common';
import { databaseProvider } from './providers';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})


export class DatabaseModule {
}