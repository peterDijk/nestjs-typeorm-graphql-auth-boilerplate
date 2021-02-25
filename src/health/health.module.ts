import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheck as HealthCheckModel } from './health.model';
// import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    // forwardRef(() => xxModule) // for relations
    TypeOrmModule.forFeature([HealthCheckModel]),
  ],
  providers: [
    HealthService,
    // HealthResolver // for graphql
  ],
  exports: [HealthService],
})
export class HealthModule {}
