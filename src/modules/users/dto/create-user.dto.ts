import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AppRoles } from 'src/config/role';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsString()
  role: string;

  @IsOptional()
  @ApiProperty()
  isActive: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  idUser: string;
}
