import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  password?: string;
}
