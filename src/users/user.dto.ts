import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import config from '../../config';

export interface UserDto {
  id: string;
  username: string;
  email: string;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(config.MIN_PW_LENGTH)
  password: string;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
