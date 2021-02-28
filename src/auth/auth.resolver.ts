import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @Mutation((returns) => User)
  async register(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return await this.authService.register({ username, email, password });
  }
}
