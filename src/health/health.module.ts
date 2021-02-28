import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheck } from './health.model';
import { HealthController } from './health.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/user.model';
import { HealthCheckResolver } from './health.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule), // for relations
    TypeOrmModule.forFeature([HealthCheck, User]),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [
    HealthService,
    HealthCheckResolver, // for graphql
  ],
  exports: [HealthService],
})
export class HealthModule {}
