import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { CreateUserDto, LoginUserDto, UserDto } from '../users/user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload, LoginStatus } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(userDto);
    } catch (err) {
      throw new HttpException('Error registration', HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      email: user.email,
      accessToken: token.accessToken,
    };
  }

  private _createToken({ username }: UserDto): { accessToken: string } {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
