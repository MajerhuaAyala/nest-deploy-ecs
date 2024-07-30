import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProviders } from './user.provider';
import { DatabaseModule } from '../database/module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...UserProviders],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {
}
