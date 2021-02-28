import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
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
  async healthchecks(): Promise<HealthCheck[]> {
    const healths = await this.healthService.findAll();
    this.logger.log(healths, 'gethealthchecks');
    return healths;
  }
}
