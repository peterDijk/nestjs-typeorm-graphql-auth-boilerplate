import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/graphql.guard';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { HealthCheck } from './health.model';
import { HealthService } from './health.service';

@Resolver((of) => HealthCheck)
export class HealthCheckResolver {
  constructor(
    @Inject(HealthService) private healthService: HealthService,
    @Inject(UsersService) private userService: UsersService,
  ) {}
  private readonly logger = new Logger(HealthCheckResolver.name);

  @Query((returns) => [HealthCheck])
  @UseGuards(GqlAuthGuard)
  async healthchecks(@CurrentUser() user: User): Promise<HealthCheck[]> {
    const healths = await this.healthService.findAll();
    return healths;
  }

  @Mutation((returns) => HealthCheck)
  @UseGuards(GqlAuthGuard)
  async addHealthCheck(@CurrentUser() user: User): Promise<HealthCheck> {
    return await this.healthService.create(user);
  }
}
