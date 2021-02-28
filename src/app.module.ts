import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from '../ormconfig';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, HealthModule, TypeOrmModule.forRoot(TypeOrmConfig)],
})
export class AppModule {}
