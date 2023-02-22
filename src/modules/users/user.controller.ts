import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { userInfo } from 'os';
import { AppRoles } from 'src/config/role';
import { SaveLoginLog } from '../auth/interface/saveDB';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFinger } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject('LOGIN_LOG_MODEL')
    private readonly loginLogModel: Model<SaveLoginLog>,
    @Inject('USERS_MODEL') private readonly userModel: Model<UserFinger>,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async registerUser(@Body() registerUserDto: CreateUserDto) {
    console.log('registerUserDto: ', registerUserDto);
    return await this.userService.registerUser(registerUserDto);
  }

  // Update role user -> admin
  @Put('/updateRole/:username')
  @UseGuards(AuthGuard('jwt'))
  @Roles(AppRoles.SUPER)
  updateUserRole(@Param() param: { username: string }, @Request() { user }) {
    return this.userService.updateUserRole(param.username, user);
  }

  // Get list user want to be Admin - Only Super see it
  @Get('/getListUserToBeAdmin')
  @UseGuards(AuthGuard('jwt'))
  @Roles(AppRoles.SUPER)
  getListUserToBeAdmin() {
    return this.userService.getListUserToBeAdmin();
  }

  @Get('/getInfoUser')
  @UseGuards(AuthGuard('jwt'))
  @Roles(AppRoles.USER)
  async getUserInfo(@Request() { user }) {
    return user;
  }

  @Get('/me')
  @Roles(AppRoles.NO_ROLE)
  async getProfile(@Request() request) {
    return request.person;
  }
}
