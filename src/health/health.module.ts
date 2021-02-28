import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheck } from './health.model';
import { HealthController } from './health.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
// import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    // forwardRef(() => xxModule) // for relations
    TypeOrmModule.forFeature([HealthCheck]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [
    HealthService,
    // HealthResolver // for graphql
  ],
  exports: [HealthService],
})
export class HealthModule {}
