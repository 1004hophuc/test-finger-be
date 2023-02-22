import { IsAlphanumeric, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { AppRoles } from 'src/config/role';

export class PayloadTokenDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  password?: string;

  @IsEnum(AppRoles)
  @IsNotEmpty()
  role: string;
}
