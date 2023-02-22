import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserFinger } from '../users/user.interface';
import { UserService } from '../users/user.service';
import { prettyPrintSeconds } from '../utils/helper';
import { SignInDto } from './dto/sign-in.dto';
import { IITokenReturnBody } from './interface/return.body';
import { SaveLoginLog } from './interface/saveDB';

@Injectable()
export class AuthService {
  private readonly expiration: string;
  constructor(
    @Inject('LOGIN_LOG_MODEL')
    private readonly loginLogModel: Model<SaveLoginLog>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.expiration = process.env.WEBTOKEN_EXPIRATION_TIME;
  }

  async validateUser(payload: SignInDto, timeLogin: Date): Promise<UserFinger> {
    const user = await this.userService.getUserByNameAndPass(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException(
        "Couldn't authenticate. Please try again!",
      );
    }

    timeLogin = new Date();

    const userSaveLog: SaveLoginLog = {};
    userSaveLog.email = user.email;
    userSaveLog.timeLogin = timeLogin;
    userSaveLog.role = user.role;

    this.loginLogModel.create(userSaveLog);

    return user;
  }

  async createToken({
    email,
    username,
    password,
    role,
  }): Promise<IITokenReturnBody> {
    return {
      expires: this.expiration,
      expiresPrettyPrint: prettyPrintSeconds(this.expiration),
      token: this.jwtService.sign({ email, username, password, role }),
    };
  }
}
