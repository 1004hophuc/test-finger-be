import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRole, UserFinger } from './user.interface';
import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Messages } from 'src/config/messages';
import { comparePassword, encryptPassword } from '../utils/helper';
import { AppRoles } from 'src/config/role';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_MODEL') private readonly userFingerModel: Model<UserFinger>,
  ) {}

  async registerUser(registerUserDto: CreateUserDto): Promise<UserFinger> {
    console.log('registerUserDto2:', registerUserDto.username);

    const alreadyUser = await this.userFingerModel.findOne({
      $or: [
        { username: registerUserDto.username },
        { email: registerUserDto.email },
      ],
    });
    if (alreadyUser) {
      throw new BadRequestException(Messages.USERNAME_OR_EMAIL_USED);
    }

    if (registerUserDto.role == AppRoles.USER) {
      registerUserDto.isActive = true;
      const user = await this.userFingerModel.create(registerUserDto);
      return user.save();
    }

    registerUserDto.role = registerUserDto.role;
    const user = await this.userFingerModel.create(registerUserDto);

    return user.save();
  }

  async updateUserRole(username: string, userAdmin: any): Promise<UpdateRole> {
    console.log('userAdmin: ', userAdmin);
    const superAdmin = await this.userFingerModel.findOne({
      email: userAdmin.email,
    });
    if (!(superAdmin.role == AppRoles.SUPER)) {
      throw new BadRequestException(Messages.NOT_PERMISSION);
    }

    const userUpdate = await this.userFingerModel.findOne({
      username: username,
    });

    userUpdate.role = AppRoles.ADMIN;
    userUpdate.isActive = true;
    return userUpdate.save();
  }

  async getListUserToBeAdmin(): Promise<any> {
    try {
      const result = await this.userFingerModel
        .find({
          $and: [
            {
              role: AppRoles.ADMIN,
            },
            {
              isActive: false,
            },
          ],
        })
        .select('email username role isActive');

      return { listData: result, status: 'Success' };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUserByNameAndPass(
    username: string,
    password: string,
  ): Promise<UserFinger> {
    console.log('username, password: ', username, password);
    const user = await this.userFingerModel.findOne({
      username: username,
    });
    console.log('user:', user);
    console.log('user:', user.password);
    console.log(
      '!comparePassword(password, user.password): ',
      comparePassword(password, user.password),
    );
    if (!user || !comparePassword(password, user.password)) {
      throw new BadRequestException(Messages.USERNAME_PASSWORD_INVALID);
    }
    if (user != undefined) {
      console.log('user: ', user);
      return user;
    } else {
      throw new UnauthorizedException('Can not find user in Model');
    }
  }
}
