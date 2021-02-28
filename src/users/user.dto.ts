import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import config from '../../config';

export interface UserDto {
  id: string;
  username: string;
  email: string;
}

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
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
