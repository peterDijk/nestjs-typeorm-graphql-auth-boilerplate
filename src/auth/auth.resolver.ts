import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../users/user.dto';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { LoginStatus } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @Mutation((returns) => User)
  async register(
    @Args('user', { type: () => CreateUserDto }) userDto: CreateUserDto,
  ): Promise<User> {
    return await this.authService.register(userDto);
  }

  @Mutation((returns) => LoginStatus)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const result = await this.authService.login({ username, password });
    console.log({ result });
    return result;
  }
}
