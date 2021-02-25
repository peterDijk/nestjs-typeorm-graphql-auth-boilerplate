import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheck } from './health.model';
import { HealthController } from './health.controller';
// import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    // forwardRef(() => xxModule) // for relations
    TypeOrmModule.forFeature([HealthCheck]),
  ],
  controllers: [HealthController],
  providers: [
    HealthService,
    // HealthResolver // for graphql
  ],
  exports: [HealthService],
})
export class HealthModule {}
