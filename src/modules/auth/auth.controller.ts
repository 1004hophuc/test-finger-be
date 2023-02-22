import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { ITokenReturnBody } from './interface/return.body';
import * as CircularJson from 'circular-json';
import { Model } from 'mongoose';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() payload: SignInDto, @Req() req): Promise<any> {
    const user = await this.authService.validateUser(payload, req.user?.email);
    console.log('userlogin:', user);

    const token = await this.authService.createToken(user);

    return {
      user,
      token,
    };
  }
}
