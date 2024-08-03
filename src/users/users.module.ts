import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProviders } from './user.provider';
import { DatabaseModule } from '../database/module';
import { UserController } from './user.controller';
import { createUserSchema } from './users.schama';
import { ValidationCreateUserSchema } from './middleware/validation-create-user-schema';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...UserProviders],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        return new ValidationCreateUserSchema(createUserSchema).use(req, res, next);
      })
      .forRoutes({ path: 'users/signup', method: RequestMethod.POST });
  }
}
