import { Module } from '@nestjs/common';
import { authProviders } from '../auth/auth.provider';
import { AuthService } from '../auth/auth.service';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.provider';
import { UserController } from './user.controller';
import { usersProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...usersProviders,
    ...databaseProviders,
    ...authProviders,
  ],
  exports: [UserService],
})
export class UsersModule {}
