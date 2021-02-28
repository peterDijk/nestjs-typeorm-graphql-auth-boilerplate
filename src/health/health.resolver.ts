import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GqlAuthGuard } from '../auth/graphql.guard';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { HealthCheckResponse } from './health.dto';
import { HealthCheck } from './health.model';
import { HealthService } from './health.service';

@Resolver((of) => HealthCheck)
export class HealthCheckResolver {
  constructor(
    @Inject(HealthService) private healthService: HealthService,
    @Inject(UsersService) private userService: UsersService,
  ) {}
  private readonly logger = new Logger(HealthCheckResolver.name);

  @Query((returns) => HealthCheckResponse)
  healthcheck(): HealthCheckResponse {
    return {
      message: 'ok',
    };
  }

  @Query((returns) => [HealthCheck], { description: 'Authorized' })
  @UseGuards(GqlAuthGuard)
  async allHealthChecks(@CurrentUser() user: User): Promise<HealthCheck[]> {
    const healths = await this.healthService.findAll();
    return healths;
  }

  @Mutation((returns) => HealthCheck, { description: 'Authorized' })
  @UseGuards(GqlAuthGuard)
  async addHealthCheck(@CurrentUser() user: User): Promise<HealthCheck> {
    return await this.healthService.create(user);
  }
}
