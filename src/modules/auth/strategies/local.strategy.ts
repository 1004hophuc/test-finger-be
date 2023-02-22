import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { UserI } from 'src/modules/users/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // async validate(username: string, password: string): Promise<User> {
  //   const user = await this.authService.validateUserNew(username, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   console.log('userJwtLocal: ', user);

  //   return user;
  // }
}
