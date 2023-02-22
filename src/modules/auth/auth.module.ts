import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.provider';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        ...(process.env.WEBTOKEN_EXPIRATION_TIME
          ? {
              expiresIn: Number(process.env.WEBTOKEN_EXPIRATION_TIME),
            }
          : {}),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, JwtStrategy],
  exports: [AuthService, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
