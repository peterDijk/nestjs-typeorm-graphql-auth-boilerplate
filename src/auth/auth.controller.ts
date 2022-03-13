import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from 'src/users/user.model';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { LoginStatus } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password } = createUserDto;

    if (!email || !password || !username) {
      throw new HttpException(
        'provide both username, email and password',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.authService.register(createUserDto);
    } catch (err) {
      throw new HttpException('registration error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
